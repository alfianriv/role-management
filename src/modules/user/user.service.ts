import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
  ) {}

  create(data: CreateUserDto) {
    return this.repository.save(data, { reload: true });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.findOneById(id);
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findOneById(id);
    return this.repository.save({ id, ...data }, { reload: true });
  }

  async remove(id: number) {
    await this.findOneById(id);
    const deleted = await this.repository.softDelete(id);
    return { success: deleted.affected > 0 };
  }

  async findOneById(id: number) {
    const user = await this.repository.findOne(id, {
      relations: ['role'],
    });
    if (!user) throw new NotFoundException(`User with ID "${id}" not found`);
    return user;
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.findOneById(userId);
    await this.roleService.findOneById(roleId);
    user.roleId = roleId;
    return this.repository.save(user, { reload: true });
  }
}
