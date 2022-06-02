import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
