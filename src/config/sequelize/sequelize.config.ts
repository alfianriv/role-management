import { PermissionGroupEntity } from '@/src/modules/permission-group/entities/permission-group.entity';
import { PermissionGroupsPermissionsEntity } from '@/src/modules/permission-groups-permissions/entity/permission-groups-permissions.entity';
import { PermissionGroupsRolesEntity } from '@/src/modules/permission-groups-roles/entity/permission-groups-roles.entity';
import { PermissionEntity } from '@/src/modules/permission/entities/permission.entity';
import { RoleEntity } from '@/src/modules/role/entities/role.entity';
import { UserEntity } from '@/src/modules/user/entities/user.entity';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const config: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'role-management',
  logging: false,
  models: [
    UserEntity,
    RoleEntity,
    PermissionGroupEntity,
    PermissionGroupsRolesEntity,
    PermissionEntity,
    PermissionGroupsPermissionsEntity,
  ],
};
