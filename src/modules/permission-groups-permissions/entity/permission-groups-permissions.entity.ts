import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PermissionGroupEntity } from '@/src/modules/permission-group/entities/permission-group.entity';
import { PermissionEntity } from '@/src/modules/permission/entities/permission.entity';

@Table({ tableName: 'PermissionGroupsPermissions' })
export class PermissionGroupsPermissionsEntity extends Model {
  @Column
  @ForeignKey(() => PermissionGroupEntity)
  permissionGroupId: number;

  @BelongsTo(() => PermissionGroupEntity)
  permissionGroup: PermissionGroupEntity;

  @Column
  @ForeignKey(() => PermissionEntity)
  permissionId: number;

  @BelongsTo(() => PermissionEntity)
  permission: PermissionEntity;
}
