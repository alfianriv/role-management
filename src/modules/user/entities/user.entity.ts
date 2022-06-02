import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsEmail,
  Table,
  Unique,
} from 'sequelize-typescript';
import { RoleEntity } from '@/src/modules/role/entities/role.entity';
import { BaseEntity } from '@/src/commons/base.entity';

@Table({ tableName: 'Users' })
export class UserEntity extends BaseEntity {
  @Column
  name: string;

  @IsEmail
  @Unique
  @Column
  email: string;

  @ForeignKey(() => RoleEntity)
  @AllowNull
  @Column
  roleId: number;

  @BelongsTo(() => RoleEntity)
  role: RoleEntity;

  @Column(DataType.VIRTUAL)
  get getPermissions() {
    const role = this.role?.get();
    if (!role) return [];
    const permissionGroups = role.permissionGroups?.map((pg) => pg.get());
    const permissions = [];
    if (permissionGroups) {
      permissionGroups.forEach((permissionGroup) => {
        permissions.push(
          ...permissionGroup.permissions?.map(
            (permission) => permission.get().name,
          ),
        );
      });
    }
    return [...new Set(permissions)];
  }
}
