import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleEntity)
    private readonly repository: typeof RoleEntity,
  ) {}

  static rolesCannotBeModified() {
    return ['superadmin'];
  }

  isRoleCannotBeModified(role: string) {
    const isRoleCannotBeModified =
      RoleService.rolesCannotBeModified().includes(role);
    if (isRoleCannotBeModified)
      throw new NotFoundException(
        `Role with name "${role}" cannot be modified`,
      );
    return false;
  }

  async create(data: CreateRoleDto) {
    await this.isUnique(data.name);
    this.isRoleCannotBeModified(data.name);
    const role: any = data;
    return this.repository.create(role);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.findOneById(id);
  }

  async update(id: number, data: UpdateRoleDto) {
    this.isRoleCannotBeModified(data.name);
    const role = await this.findOneById(id);
    await this.isUnique(data.name, id);
    role.update({ ...data });
    return role.save();
  }

  async remove(id: number) {
    const role = await this.findOneById(id);
    this.isRoleCannotBeModified(role.name);
    await this.hasChild(id);
    await role.destroy();
    return { success: true };
  }

  async findOneById(id: number) {
    const role = await this.repository.findByPk(id, { include: ['users'] });
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

  async hasChild(id: number) {
    const role = await this.findOneById(id);
    if (role.users.length > 0)
      throw new NotFoundException(`Role with ID "${id}" cannot be deleted`);
    return false;
  }
}
