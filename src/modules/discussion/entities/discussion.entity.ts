import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { PerfumeEntity } from '../../perfume/entities/perfume.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Table({ tableName: 'Discussions' })
export class DiscussionEntity extends Model {
  @Column(DataType.TEXT)
  discussion: string;

  @ForeignKey(() => DiscussionEntity)
  @AllowNull
  @Column
  discussionId: number;

  @ForeignKey(() => PerfumeEntity)
  @Column
  perfumeId: number;

  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @HasMany(() => DiscussionEntity)
  replies: DiscussionEntity[];

  @HasOne(() => PerfumeEntity)
  perfume: PerfumeEntity;

  @HasOne(() => UserEntity)
  user: UserEntity;
}
