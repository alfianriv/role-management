import { BelongsToMany, Column, Table, Unique } from 'sequelize-typescript';
import { PermissionGroupsPermissionsEntity } from '@/src/modules/permission-groups-permissions/entity/permission-groups-permissions.entity';
import { PermissionGroupsRolesEntity } from '@/src/modules/permission-groups-roles/entity/permission-groups-roles.entity';
import { BaseEntity } from '@/src/commons/base.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { PermissionEntity } from '../../permission/entities/permission.entity';

@Table({ tableName: 'PermissionGroups' })
export class PermissionGroupEntity extends BaseEntity {
  @Unique
  @Column
  name: string;

  @BelongsToMany(() => RoleEntity, () => PermissionGroupsRolesEntity)
  roles: Array<
    RoleEntity & { PermissionGroupsRolesEntity: PermissionGroupsRolesEntity }
  >;

  @BelongsToMany(
    () => PermissionEntity,
    () => PermissionGroupsPermissionsEntity,
  )
  permissions: Array<
    PermissionEntity & {
      PermissionGroupsPermissionsEntity: PermissionGroupsPermissionsEntity;
    }
  >;
}
