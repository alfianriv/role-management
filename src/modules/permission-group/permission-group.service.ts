import { PaginationDto } from '@/src/commons/pagination.dto';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PermissionService } from '../permission/permission.service';
import { RoleService } from '../role/role.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { PermissionGroupEntity } from './entities/permission-group.entity';

@Injectable()
export class PermissionGroupService {
  constructor(
    @InjectModel(PermissionGroupEntity)
    private readonly repository: typeof PermissionGroupEntity,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => PermissionService))
    private readonly permissionService: PermissionService,
  ) {}

  async create(data: CreatePermissionGroupDto) {
    await this.isUnique(data.name);
    const permissionGroup: any = data;
    const saved = await this.repository.create(permissionGroup);
    return { data: saved };
  }

  async findAll(query: PaginationDto) {
    const [data, total]: any = await this.repository.findAndCountAll({
      limit: query.perPage,
      offset: query.perPage * (query.page - 1),
    });
  }

  async findOne(id: number) {
    const permissionGroup = await this.findOneById(id, {
      include: ['roles', 'permissions'],
    });
    return { data: permissionGroup };
  }

  async update(id: number, data: UpdatePermissionGroupDto) {
    const permissionGroup = await this.findOneById(id);
    await this.isUnique(data.name, id);
    await permissionGroup.update({ ...data });
    return { data: permissionGroup };
  }

  async remove(id: number) {
    const permissionGroup = await this.findOneById(id, {
      include: ['roles', 'permissions'],
    });
    this.isHasChild(permissionGroup);
    await permissionGroup.destroy();
    return { data: { success: true } };
  }

  async assignRole(id: number, roleId: number) {
    const permissionGroup = await this.findOneById(id);
    await this.roleService.findOneById(roleId);
    await permissionGroup.$add('roles', roleId);
    const saved = await this.findOneById(id, { include: ['roles'] });
    return { data: saved };
  }

  async revokeRole(id: number, roleId: number) {
    const permissionGroup = await this.findOneById(id);
    await this.roleService.findOneById(roleId);
    await permissionGroup.$remove('roles', roleId);
    const saved = await this.findOneById(id, { include: ['roles'] });
    return { data: saved };
  }

  async assignPermission(id: number, permissionId: number) {
    const permissionGroup = await this.findOneById(id);
    await this.permissionService.findOneById(permissionId);
    await permissionGroup.$add('permissions', permissionId);
    const saved = await this.findOneById(id, { include: ['permissions'] });
    return { data: saved };
  }

  async revokePermission(id: number, permissionId: number) {
    const permissionGroup = await this.findOneById(id);
    await this.permissionService.findOneById(permissionId);
    await permissionGroup.$remove('permissions', permissionId);
    const saved = await this.findOneById(id, { include: ['permissions'] });
    return { data: saved };
  }

  isHasChild(permissionGroup: PermissionGroupEntity) {
    if (permissionGroup.roles.length > 0)
      throw new BadRequestException(
        `PermissionGroup with name "${permissionGroup.name}" has roles`,
      );
    if (permissionGroup.permissions.length > 0)
      throw new BadRequestException(
        `PermissionGroup with name "${permissionGroup.name}" has permissions`,
      );
  }

  async isUnique(name: string, exceptionId?) {
    const where: any = {
      name,
    };

    if (exceptionId) {
      where.id = {
        [Op.not]: exceptionId,
      };
    }

    const permissionGroup = await this.repository.findOne({ where });
    if (permissionGroup)
      throw new BadRequestException(
        `PermissionGroup with name "${name}" already exists`,
      );
  }

  async findOneById(id: number, options?) {
    const permissionGroup = await this.repository.findByPk(id, options);
    if (!permissionGroup)
      throw new NotFoundException(`PermissionGroup with ID "${id}" not found`);
    return permissionGroup;
  }
}
