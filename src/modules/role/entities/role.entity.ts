import {
  BelongsToMany,
  Column,
  HasMany,
  Table,
  Unique,
} from 'sequelize-typescript';
import { PermissionGroupsRolesEntity } from '@/src/modules/permission-groups-roles/entity/permission-groups-roles.entity';
import { UserEntity } from '@/src/modules/user/entities/user.entity';
import { BaseEntity } from '@/src/commons/base.entity';
import { PermissionGroupEntity } from '../../permission-group/entities/permission-group.entity';

@Table({ tableName: 'Roles' })
export class RoleEntity extends BaseEntity {
  @Unique
  @Column
  name: string;

  @HasMany(() => UserEntity)
  users: UserEntity[];

  @BelongsToMany(() => PermissionGroupEntity, () => PermissionGroupsRolesEntity)
  permissionGroups: Array<
    PermissionGroupEntity & {
      PermissionGroupsRolesEntity: PermissionGroupsRolesEntity;
    }
  >;
}
