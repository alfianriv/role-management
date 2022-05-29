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
import { PermissionGroupService } from '../permission-group/permission-group.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(PermissionEntity)
    private readonly repository: typeof PermissionEntity,
    @Inject(forwardRef(() => PermissionGroupService))
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  async create(data: CreatePermissionDto) {
    await this.isUnique(data.name);
    const permission: any = data;
    const saved = await this.repository.create(permission);
    return { data: saved };
  }

  async findAll(query: PaginationDto) {
    const [data, total]: any = await this.repository.findAndCountAll({
      limit: query.perPage,
      offset: query.perPage * (query.page - 1),
    });

    return {
      data,
      total,
      perPage: query.perPage,
      page: query.page,
    };
  }

  async findOne(id: number) {
    const permission = await this.findOneById(id, {
      include: ['permissionGroups'],
    });
    return { data: permission };
  }

  async update(id: number, data: UpdatePermissionDto) {
    const permission = await this.findOneById(id);
    await this.isUnique(data.name, id);
    await permission.update({ ...data });
    return { data: permission };
  }

  async remove(id: number) {
    const permission = await this.findOneById(id);
    await permission.destroy();
    return { data: { success: true } };
  }

  async assignPermissionGroup(id: number, permissionGroupId: number) {
    const permission = await this.findOneById(id);
    await this.permissionGroupService.findOneById(permissionGroupId);
    await permission.$add('permissionGroups', permissionGroupId);
    const saved = await this.findOneById(id, { include: ['permissionGroups'] });
    return { data: saved };
  }

  async revokePermissionGroup(id: number, permissionGroupId: number) {
    const permission = await this.findOneById(id);
    await this.permissionGroupService.findOneById(permissionGroupId);
    await permission.$remove('permissionGroups', permissionGroupId);
    const saved = await this.findOneById(id, { include: ['permissionGroups'] });
    return { data: saved };
  }

  async findOneById(id: number, options?) {
    const permission = await this.repository.findByPk(id, options);
    if (!permission)
      throw new NotFoundException(`Permission with ID "${id}" not found`);

    return permission;
  }

  async isUnique(name: string, exceptionId?: number) {
    const where: any = {
      name,
    };

    if (exceptionId) {
      where.id = {
        [Op.not]: exceptionId,
      };
    }

    const permission = await this.repository.findOne({
      where,
      paranoid: false,
    });

    if (permission) {
      throw new BadRequestException(
        `Permission with name "${name}" already exists`,
      );
    }
  }
}
