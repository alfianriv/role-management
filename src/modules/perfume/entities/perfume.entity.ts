import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
