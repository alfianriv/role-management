import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { PermissionGroupsPermissionsEntity } from '@/src/modules/permission-groups-permissions/entity/permission-groups-permissions.entity';
import { PermissionGroupsRolesEntity } from '@/src/modules/permission-groups-roles/entity/permission-groups-roles.entity';

@Table({ tableName: 'PermissionGroups' })
export class PermissionGroupEntity extends Model {
  @Unique
  @Column
  name: string;

  @HasMany(() => PermissionGroupsRolesEntity)
  roles: PermissionGroupsRolesEntity[];

  @HasMany(() => PermissionGroupsPermissionsEntity)
  permissions: PermissionGroupsPermissionsEntity[];
}
