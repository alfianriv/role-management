import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { BrandEntity } from '../../brand/entities/brand.entity';
import { DiscussionEntity } from '../../discussion/entities/discussion.entity';
import { VariantEntity } from '../../variant/entities/variant.entity';

@Table({ tableName: 'Perfumes' })
export class PerfumeEntity extends Model {
  @Column
  name: string;

  @Column(DataType.JSON)
  description: any;

  @Column
  image: string;

  @Column(DataType.TEXT)
  ingredients: string;

  @Column(DataType.TEXT)
  howtToUse: string;

  @ForeignKey(() => BrandEntity)
  @Column
  brandId: number;

  @HasOne(() => BrandEntity)
  brand: BrandEntity;

  @HasMany(() => VariantEntity)
  variants: VariantEntity[];

  @HasMany(() => DiscussionEntity)
  discussions: DiscussionEntity[];

  @Column(DataType.VIRTUAL)
  get avg_rating() {
    const ratings = this.variants?.map((variant) => variant.get().avg_rating);
    if (ratings) {
      return ratings.reduce((a, b) => a + b, 0) / ratings.length;
    }
    return 0;
  }

  @Column(DataType.VIRTUAL)
  get total_review() {
    return this.variants
      ?.map((variant) => variant.get().total_review)
      .reduce((a, b) => a + b, 0);
  }

  @Column(DataType.VIRTUAL)
  get total_discussion() {
    return this.discussions?.length;
  }
}
