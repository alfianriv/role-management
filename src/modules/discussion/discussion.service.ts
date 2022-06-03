import { PaginationDto } from '@/src/commons/pagination.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { DiscussionEntity } from './entities/discussion.entity';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectModel(DiscussionEntity)
    private readonly repository: typeof DiscussionEntity,
  ) {}

  async create(user, data: CreateDiscussionDto) {
    const discussion: any = data;
    discussion.userId = user.id;
    const saved = await this.repository.create(discussion);
    return { data: saved };
  }

  async findAll(query: PaginationDto) {
    const [data, total]: any = await this.repository.findAndCountAll({
      limit: query.perPage,
      offset: query.perPage * (query.page - 1),
    });

    return {
      data,
      total,
      perPage: query.perPage,
      page: query.page,
    };
  }

  async findOne(id: number) {
    const discussion = await this.findOneById(id, {
      include: ['user', 'replies', 'replies.user', 'perfume'],
    });
    return { data: discussion };
  }

  async update(user, id: number, data: UpdateDiscussionDto) {
    const discussion = await this.findOneById(id);
    if (discussion.userId !== user.id)
      throw new UnauthorizedException(
        `You are not allowed to update this discussion`,
      );
    await discussion.update({ ...data });
    return { data: discussion };
  }

  async remove(user, id: number) {
    const discussion = await this.findOneById(id);
    if (discussion.userId !== user.id)
      throw new UnauthorizedException(
        `You are not allowed to delete this discussion`,
      );
    await discussion.destroy();
    return { data: { success: true } };
  }

  async findOneById(id: number, options?) {
    const discussion = await this.repository.findByPk(id, options);
    if (!discussion)
      throw new NotFoundException(`Discussion with id ${id} not found`);

    return discussion;
  }
}
