import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  IsEmail,
  Table,
  Unique,
  UpdatedAt,
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
}
