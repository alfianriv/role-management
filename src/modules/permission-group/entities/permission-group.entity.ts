import { Column, HasMany, Table, Unique } from 'sequelize-typescript';
import { PermissionGroupsPermissionsEntity } from '@/src/modules/permission-groups-permissions/entity/permission-groups-permissions.entity';
import { PermissionGroupsRolesEntity } from '@/src/modules/permission-groups-roles/entity/permission-groups-roles.entity';
import { BaseEntity } from '@/src/commons/base.entity';

@Table({ tableName: 'PermissionGroups' })
export class PermissionGroupEntity extends BaseEntity {
  @Unique
  @Column
  name: string;

  @HasMany(() => PermissionGroupsRolesEntity)
  roles: PermissionGroupsRolesEntity[];

  @HasMany(() => PermissionGroupsPermissionsEntity)
  permissions: PermissionGroupsPermissionsEntity[];
}
