import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity)
    private readonly repository: typeof UserEntity,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
  ) {}

  async create(data: CreateUserDto) {
    const user: any = data;
    await this.isDuplicateEmail(user.email);
    const saved = await this.repository.create(user);
    return { data: saved };
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const user = await this.findOneById(id);
    return { data: user };
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOneById(id);
    await this.isDuplicateEmail(data.email, id);
    user.update({ ...data });
    return { data: await user.save() };
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    await this.repository.destroy({ where: { id } });
    return { data: { success: true } };
  }

  async findOneById(id: number) {
    const user = await this.repository.findByPk(id, {
      include: ['role'],
    });
    if (!user) throw new NotFoundException(`User with ID "${id}" not found`);
    return user;
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.findOneById(userId);
    await this.roleService.findOneById(roleId);
    user.role.id = roleId;
    return { data: await user.save() };
  }

  async isDuplicateEmail(email: string, exceptionId: number = null) {
    const where: any = {
      email,
    };

    if (exceptionId) {
      where.id = {
        [Op.not]: exceptionId,
      };
    }
    const user = await this.repository.findOne({ where, paranoid: false });
    if (user) throw new BadRequestException(`Email "${email}" already exists`);
  }
}
