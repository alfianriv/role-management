import { Injectable, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async create(data: CreateRoleDto) {
    await this.isUnique(data.name);
    return this.repository.save(data, { reload: true });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.findOneById(id);
  }

  async update(id: number, data: UpdateRoleDto) {
    await this.findOneById(id);
    await this.isUnique(data.name, id);
    return this.repository.save({ id, ...data }, { reload: true });
  }

  async remove(id: number) {
    await this.findOneById(id);
    await this.hasChild(id);
    const deleted = await this.repository.softDelete(id);
    return { success: deleted.affected > 0 };
  }

  async findOneById(id: number) {
    const role = await this.repository.findOne(id, { relations: ['users'] });
    if (!role) throw new NotFoundException(`Role with ID "${id}" not found`);
    return role;
  }

  async isUnique(name: string, idException: number = null) {
    const where: any = { name };
    if (idException) where.id = Not(idException);
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
