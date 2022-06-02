import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'Reviews' })
export class ReviewEntity extends Model {
    @Column(DataType.TEXT)
    review: string;

    @Column
    perfumeId: number;

    @Column
    variantId: number;

    @Column
    userId: number;

    @Column
    rating: number;
}
