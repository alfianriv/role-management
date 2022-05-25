import { PermissionGroupEntity } from 'src/modules/permission-group/entities/permission-group.entity';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity({ name: 'PermissionGroupsPermissions' })
export class PermissionGroupPermissionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer' })
  permissionGroupId: number;

  @Column({ type: 'integer' })
  permissionId: number;

  @ManyToOne(
    () => PermissionGroupEntity,
    (permissionGroup) => permissionGroup.permissions,
  )
  @JoinColumn({ name: 'permissionGroupId' })
  permissionGroup: PermissionGroupEntity;

  @ManyToOne(
    () => PermissionEntity,
    (permission) => permission.permissionGroups,
  )
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionEntity;
}
