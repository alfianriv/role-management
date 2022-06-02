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
  hotToUse: string;

  @ForeignKey(() => BrandEntity)
  @Column
  brandId: number;

  @HasOne(() => BrandEntity)
  brand: BrandEntity;

  @HasMany(() => VariantEntity)
  variants: VariantEntity[];

  @HasMany(() => DiscussionEntity)
  discussions: DiscussionEntity[];
}
