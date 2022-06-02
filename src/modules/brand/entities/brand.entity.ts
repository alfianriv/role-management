import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Brands' })
export class BrandEntity extends Model {
  @Column
  name: string;

  @AllowNull
  @Column
  image: string;
}
