import { BaseEntity } from 'src/commons/base.entity';
import { PermissionGroupEntity } from 'src/modules/permission-group/entities/permission-group.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Roles' })
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToMany((type) => UserEntity, (user) => user.role)
  users: UserEntity[];

  @ManyToMany(() => PermissionGroupEntity)
  @JoinTable({
    name: 'PermissionGroupsRoles',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'permissionGroupId' },
  })
  permissionGroups: PermissionGroupEntity[];
}
