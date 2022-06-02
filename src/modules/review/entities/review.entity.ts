import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../../user/entities/user.entity';
import { VariantEntity } from '../../variant/entities/variant.entity';

@Table({ tableName: 'Reviews' })
export class ReviewEntity extends Model {
  @Column(DataType.TEXT)
  review: string;

  @ForeignKey(() => VariantEntity)
  @Column
  variantId: number;

  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @Column
  rating: number;

  @HasOne(() => VariantEntity)
  variant: VariantEntity;

  @HasOne(() => UserEntity)
  user: UserEntity;
}
