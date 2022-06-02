import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { PerfumeEntity } from '../../perfume/entities/perfume.entity';

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
}
