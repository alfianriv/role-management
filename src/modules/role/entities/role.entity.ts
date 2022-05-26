import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { PermissionGroupsRolesEntity } from 'src/modules/permission-groups-roles/entity/permission-groups-roles.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Table
export class RoleEntity extends Model {
  @Column
  @Unique
  name: string;

  @HasMany(() => UserEntity)
  users: UserEntity[];

  @HasMany(() => PermissionGroupsRolesEntity)
  permissionGroups: PermissionGroupsRolesEntity[];
}
