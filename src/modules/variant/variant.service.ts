import { PaginationDto } from '@/src/commons/pagination.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PerfumeEntity } from '../perfume/entities/perfume.entity';
import { ReviewEntity } from '../review/entities/review.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { VariantEntity } from './entities/variant.entity';

@Injectable()
export class VariantService {
  constructor(
    @InjectModel(VariantEntity)
    private readonly repository: typeof VariantEntity,
  ) {}

  async create(data: CreateVariantDto) {
    const variant: any = data;
    const saved = await this.repository.create(variant);
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
    const variant = await this.findOneById(id, {
      include: ['perfume', 'variants', 'reviews'],
    });
    return { data: variant };
  }

  async update(id: number, data: UpdateVariantDto) {
    const variant = await this.findOneById(id);
    await variant.update(data);
    return { data: variant };
  }

  async remove(id: number) {
    const variant = await this.findOneById(id);
    await variant.destroy();
    return { data: { success: true } };
  }

  async findOneById(id: number, options?) {
    const variant = await this.repository.findByPk(id, options);
    if (!variant)
      throw new NotFoundException(`Variant with id ${id} not found`);

    return variant;
  }
}
