import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'PermissionGroups' })
export class PermissionGroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'PermissionGroupRoles',
    joinColumn: { name: 'permissionGroupId' },
    inverseJoinColumn: { name: 'roleId' },
  })
  roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity)
  @JoinTable({
    name: 'PermissionGroupsPermissions',
    joinColumn: { name: 'permissionGroupId' },
    inverseJoinColumn: { name: 'permissionId' },
  })
  permissions: PermissionEntity[];
}
