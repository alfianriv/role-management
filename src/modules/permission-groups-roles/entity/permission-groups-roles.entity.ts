import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PermissionGroupEntity } from '@/src/modules/permission-group/entities/permission-group.entity';
import { RoleEntity } from '@/src/modules/role/entities/role.entity';

@Table({ tableName: 'PermissionGroupsRoles' })
export class PermissionGroupsRolesEntity extends Model {
  @ForeignKey(() => RoleEntity)
  @Column
  roleId: number;

  @BelongsTo(() => RoleEntity)
  role: RoleEntity;

  @ForeignKey(() => PermissionGroupEntity)
  @Column
  permissionGroupId: number;

  @BelongsTo(() => PermissionGroupEntity)
  permissionGroup: PermissionGroupEntity;
}
