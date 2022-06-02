import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
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

  @Column(DataType.VIRTUAL)
  get total_review() {
    return this.perfumes
      ?.map((perfume) => perfume.get().total_review)
      .reduce((a, b) => a + b, 0);
  }

  @Column(DataType.VIRTUAL)
  get total_perfume() {
    return this.perfumes?.length;
  }
}
