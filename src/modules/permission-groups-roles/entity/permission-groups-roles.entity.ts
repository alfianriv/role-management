import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PermissionGroupEntity } from 'src/modules/permission-group/entities/permission-group.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';

@Table({ tableName: 'PermissionGroupsRoles' })
export class PermissionGroupsRolesEntity extends Model {
  @Column
  @ForeignKey(() => RoleEntity)
  roleId: number;

  @BelongsTo(() => RoleEntity)
  role: RoleEntity;

  @Column
  @ForeignKey(() => PermissionGroupEntity)
  permissionGroupId: number;

  @BelongsTo(() => PermissionGroupEntity)
  permissionGroup: PermissionGroupEntity;
}
