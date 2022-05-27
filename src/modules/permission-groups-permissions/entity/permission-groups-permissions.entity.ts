import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { PermissionGroupEntity } from '@/src/modules/permission-group/entities/permission-group.entity';
import { PermissionEntity } from '@/src/modules/permission/entities/permission.entity';
import { BaseEntity } from '@/src/commons/base.entity';

@Table({ tableName: 'PermissionGroupsPermissions' })
export class PermissionGroupsPermissionsEntity extends BaseEntity {
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
