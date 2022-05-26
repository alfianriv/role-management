import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { PermissionGroupsRolesEntity } from '@/src/modules/permission-groups-roles/entity/permission-groups-roles.entity';
import { UserEntity } from '@/src/modules/user/entities/user.entity';

@Table({ tableName: 'Roles' })
export class RoleEntity extends Model {
  @Unique
  @Column
  name: string;

  @HasMany(() => UserEntity)
  users: UserEntity[];

  @HasMany(() => PermissionGroupsRolesEntity)
  permissionGroups: PermissionGroupsRolesEntity[];
}
