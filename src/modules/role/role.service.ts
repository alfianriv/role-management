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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleEntity)
    private readonly repository: typeof RoleEntity,
    @Inject(forwardRef(() => PermissionGroupService))
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  static rolesCannotBeModified() {
    return ['superadmin'];
  }

  isRoleCannotBeModified(role: string) {
    const isRoleCannotBeModified =
      RoleService.rolesCannotBeModified().includes(role);
    if (isRoleCannotBeModified)
      throw new BadRequestException(
        `Role with name "${role}" cannot be modified`,
      );
    return false;
  }

  async create(data: CreateRoleDto) {
    await this.isUnique(data.name);
    this.isRoleCannotBeModified(data.name);
    const role: any = data;
    const saved = await this.repository.create(role);
    return { data: saved };
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const role = await this.findOneById(id, {
      include: ['users', 'permissionGroups'],
    });
    return { data: role };
  }

  async update(id: number, data: UpdateRoleDto) {
    this.isRoleCannotBeModified(data.name);
    const role = await this.findOneById(id);
    this.isRoleCannotBeModified(role.name);
    await this.isUnique(data.name, id);
    await role.update({ ...data });
    return { data: role };
  }

  async remove(id: number) {
    const role = await this.findOneById(id, {
      include: ['users', 'permissionGroups'],
    });
    this.isRoleCannotBeModified(role.name);
    await this.hasChild(role);
    await role.destroy();
    return { data: { success: true } };
  }

  async assignPermissionGroup(id: number, permissionGroupId: number) {
    const role = await this.findOneById(id, { include: ['permissionGroups'] });
    await this.permissionGroupService.findOneById(permissionGroupId);
    await role.$add('permissionGroups', permissionGroupId);
    const saved = await this.findOneById(id, { include: ['permissionGroups'] });
    return { data: saved };
  }

  async revokePermissionGroup(id: number, permissionGroupId: number) {
    const role = await this.findOneById(id, { include: ['permissionGroups'] });
    await this.permissionGroupService.findOneById(permissionGroupId);
    await role.$remove('permissionGroups', permissionGroupId);
    const saved = await this.findOneById(id, { include: ['permissionGroups'] });
    return { data: saved };
  }

  async findOneById(id: number, options?) {
    const role = await this.repository.findByPk(id, options);
    if (!role) throw new NotFoundException(`Role with ID "${id}" not found`);
    return role;
  }

  async isUnique(name: string, idException: number = null) {
    const where: any = { name };
    if (idException) where.id = { [Op.not]: idException };
    const role = await this.repository.findOne({ where });
    if (role)
      throw new NotFoundException(`Role with name "${name}" already exists`);
    return true;
  }

  async hasChild(role: RoleEntity) {
    if (role.users.length > 0)
      throw new NotFoundException(
        `PermissionGroup with name "${role.name}" has users`,
      );
    if (role.permissionGroups.length > 0)
      throw new NotFoundException(
        `PermissionGroup with name "${role.name}" has permission groups`,
      );
  }
}
