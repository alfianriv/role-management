import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { PermissionGroupsPermissionsEntity } from 'src/modules/permission-groups-permissions/entity/permission-groups-permissions.entity';

@Table({ tableName: 'Permissions' })
export class PermissionEntity extends Model {
  @Column
  @Unique
  name: string;

  @HasMany(() => PermissionGroupsPermissionsEntity)
  permissionGroups: PermissionGroupsPermissionsEntity[];
}
