import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { RoleEntity } from '@/src/modules/role/entities/role.entity';

@Table({ tableName: 'Users' })
export class UserEntity extends Model {
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
