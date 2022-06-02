import { AllowNull, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { PerfumeEntity } from '../../perfume/entities/perfume.entity';

@Table({ tableName: 'Brands' })
export class BrandEntity extends Model {
  @Column
  name: string;

  @AllowNull
  @Column
  image: string;

  @HasMany(() => PerfumeEntity)
  perfumes: PerfumeEntity[];
}
