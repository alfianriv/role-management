import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Discussions' })
export class DiscussionEntity extends Model {
  @Column(DataType.TEXT)
  discussion: string;

  @AllowNull
  @Column
  discussionId: number;

  @Column
  perfumeId: number;

  @Column
  userId: number;
}
