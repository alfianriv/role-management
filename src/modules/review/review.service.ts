import { PaginationDto } from '@/src/commons/pagination.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewEntity) private readonly repository: typeof ReviewEntity,
  ) {}

  async create(user, data: CreateReviewDto) {
    const reviews: any = data;
    reviews.userId = user.id;
    const saved = await this.repository.create(reviews);
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
      page: query.page,
      perPage: query.perPage,
    };
  }

  async findOne(id: number) {
    const review = await this.findOneById(id, {
      include: ['user', 'perfume'],
    });
    return { data: review };
  }

  async update(user, id: number, data: UpdateReviewDto) {
    const review = await this.findOneById(id);
    if (review.userId !== user.id)
      throw new UnauthorizedException(
        `You are not allowed to update this review`,
      );
    await review.update({ ...data });
    return { data: review };
  }

  async remove(user, id: number) {
    const review = await this.findOneById(id);
    if (review.userId !== user.id)
      throw new UnauthorizedException(
        `You are not allowed to delete this review`,
      );
    await review.destroy();
    return { data: { success: true } };
  }

  async findOneById(id: number, options?) {
    const review = await this.repository.findByPk(id, options);
    if (!review) throw new NotFoundException(`Review with id ${id} not found`);

    return review;
  }
}
