import { BelongsToMany, Column, Table, Unique } from 'sequelize-typescript';
import { PermissionGroupsPermissionsEntity } from '@/src/modules/permission-groups-permissions/entity/permission-groups-permissions.entity';
import { BaseEntity } from '@/src/commons/base.entity';
import { PermissionGroupEntity } from '../../permission-group/entities/permission-group.entity';

@Table({ tableName: 'Permissions' })
export class PermissionEntity extends BaseEntity {
  @Unique
  @Column
  name: string;

  @BelongsToMany(
    () => PermissionGroupEntity,
    () => PermissionGroupsPermissionsEntity,
  )
  permissionGroups: Array<
    PermissionEntity & {
      PermissionGroupsPermissionsEntity: PermissionGroupsPermissionsEntity;
    }
  >;
}
