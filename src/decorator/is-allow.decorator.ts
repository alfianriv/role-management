import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Observable } from 'rxjs';
import { PermissionGroupEntity } from '../modules/permission-group/entities/permission-group.entity';
import { PermissionEntity } from '../modules/permission/entities/permission.entity';
import { RoleEntity } from '../modules/role/entities/role.entity';
import { UserEntity } from '../modules/user/entities/user.entity';

@Injectable()
export class IsAllow implements CanActivate {
  constructor(private readonly permission: string) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: any) {
    if (request.headers.role === 'superadmin') return true;
    const permissions = request.headers.permissions;
    const permission = this.permission;
    if (permissions.includes(permission)) return true;
    return false;
  }
}
