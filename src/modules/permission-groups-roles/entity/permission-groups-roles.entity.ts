import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { PermissionGroupEntity } from '@/src/modules/permission-group/entities/permission-group.entity';
import { RoleEntity } from '@/src/modules/role/entities/role.entity';
import { BaseEntity } from '@/src/commons/base.entity';

@Table({ tableName: 'PermissionGroupsRoles' })
export class PermissionGroupsRolesEntity extends BaseEntity {
  @ForeignKey(() => RoleEntity)
  @Column
  roleId: number;

  @ForeignKey(() => PermissionGroupEntity)
  @Column
  permissionGroupId: number;
}
