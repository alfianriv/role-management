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
import { RoleEntity } from 'src/modules/role/entities/role.entity';

@Table
export class UserEntity extends Model {
  @Column
  name: string;

  @Column
  @IsEmail
  @Unique
  email: string;

  @ForeignKey(() => RoleEntity)
  @Column
  @AllowNull
  roleId: number;

  @BelongsTo(() => RoleEntity)
  role: RoleEntity;
}
