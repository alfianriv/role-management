import { BaseEntity } from 'src/commons/base.entity';
import { PermissionGroupEntity } from 'src/modules/permission-group/entities/permission-group.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Permissions' })
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => PermissionGroupEntity)
  @JoinTable({
    name: 'PermissionGroupsPermissions',
    joinColumn: { name: 'permissionId' },
    inverseJoinColumn: { name: 'permissionGroupId' },
  })
  permissionGroups: PermissionGroupEntity[];
}
