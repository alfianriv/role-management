import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity)
    private readonly repository: typeof UserEntity,
  ) {}

  async login(data: LoginDto) {
    const user = await this.repository.findOne({
      where: { email: data.email },
    });
    if (!user) throw new UnauthorizedException('User not found');

    return {
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token: sign({ id: user.id }, process.env.SECRET_KEY),
      },
    };
  }
}
