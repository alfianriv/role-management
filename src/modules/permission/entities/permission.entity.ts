import { Column, HasMany, Table, Unique } from 'sequelize-typescript';
import { PermissionGroupsPermissionsEntity } from '@/src/modules/permission-groups-permissions/entity/permission-groups-permissions.entity';
import { BaseEntity } from '@/src/commons/base.entity';

@Table({ tableName: 'Permissions' })
export class PermissionEntity extends BaseEntity {
  @Unique
  @Column
  name: string;

  @HasMany(() => PermissionGroupsPermissionsEntity)
  permissionGroups: PermissionGroupsPermissionsEntity[];
}
