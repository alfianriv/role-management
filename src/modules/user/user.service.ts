import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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

  create(data: CreateUserDto) {
    const user: any = data;
    return this.repository.create(user);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.findOneById(id);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOneById(id);
    user.update({ ...data });
    return user.save();
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    await user.destroy();
    return { success: true };
  }

  async findOneById(id: number) {
    const user = await this.repository.findByPk(id, { include: ['role'] });
    if (!user) throw new NotFoundException(`User with ID "${id}" not found`);
    return user;
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.findOneById(userId);
    await this.roleService.findOneById(roleId);
    user.role.id = roleId;
    return user.save();
  }
}
