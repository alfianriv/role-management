import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { PermissionGroupEntity } from '../modules/permission-group/entities/permission-group.entity';
import { PermissionEntity } from '../modules/permission/entities/permission.entity';
import { RoleEntity } from '../modules/role/entities/role.entity';
import { UserEntity } from '../modules/user/entities/user.entity';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(UserEntity)
    private readonly repository: typeof UserEntity,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;
    if (!token) throw new UnauthorizedException(`Token is invalid`);
    if (!token.includes('Bearer '))
      throw new UnauthorizedException(`Token is invalid`);
    token = token.replace('Bearer ', '');
    const decoded = verify(token, process.env.SECRET_KEY);
    if (!decoded) throw new UnauthorizedException(`Token is invalid`);
    req.headers.user = decoded;
    const user = await this.getUser(decoded.id);
    req.headers.permissions = user.getPermissions;
    req.headers.role = user.role.name;
    next();
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne({
      where: { id },
      include: [
        {
          model: RoleEntity,
          include: [
            {
              model: PermissionGroupEntity,
              include: [PermissionEntity],
            },
          ],
        },
      ],
    });
    return user;
  }
}
