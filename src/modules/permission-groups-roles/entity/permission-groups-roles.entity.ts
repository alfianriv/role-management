import { BaseEntity } from 'src/commons/base.entity';
import { PermissionGroupEntity } from 'src/modules/permission-group/entities/permission-group.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'PermissionGroupsRoles' })
export class PermissionGroupRolesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer' })
  permissionGroupId: number;

  @Column({ type: 'integer' })
  roleId: number;

  @ManyToOne(
    () => PermissionGroupEntity,
    (permissionGroup) => permissionGroup.roles,
  )
  @JoinColumn({ name: 'permissionGroupId' })
  permissionGroup: PermissionGroupEntity;

  @ManyToOne(() => RoleEntity, (role) => role.permissionGroups)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;
}
