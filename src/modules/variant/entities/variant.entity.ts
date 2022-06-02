import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { PerfumeEntity } from '../../perfume/entities/perfume.entity';
import { ReviewEntity } from '../../review/entities/review.entity';

@Table({ tableName: 'Variants' })
export class VariantEntity extends Model {
  @Column
  name: string;

  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @Column(DataType.DECIMAL(10, 2))
  size: number;

  @Column
  sizeUnit: string;

  @Column
  image: string;

  @ForeignKey(() => PerfumeEntity)
  @Column
  perfumeId;

  @HasOne(() => PerfumeEntity)
  perfume: PerfumeEntity;

  @HasMany(() => ReviewEntity)
  reviews: ReviewEntity[];

  @Column(DataType.VIRTUAL)
  get avg_rating() {
    const ratings = this.reviews?.map((review) => review.get().rating);
    if (ratings) {
      return ratings.reduce((a, b) => a + b, 0) / ratings.length;
    }
    return 0;
  }

  @Column(DataType.VIRTUAL)
  get total_review() {
    return this.reviews?.length;
  }
}
