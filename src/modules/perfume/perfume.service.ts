import { PaginationDto } from '@/src/commons/pagination.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BrandEntity } from '../brand/entities/brand.entity';
import { VariantEntity } from '../variant/entities/variant.entity';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { PerfumeEntity } from './entities/perfume.entity';

@Injectable()
export class PerfumeService {
  constructor(
    @InjectModel(PerfumeEntity)
    private readonly repository: typeof PerfumeEntity,
  ) {}

  async create(data: CreatePerfumeDto) {
    const perfume: any = data;
    const saved = await this.repository.create(perfume);
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
    const perfume = await this.findOneById(id, {
      include: ['brand', 'variants', 'discussions'],
    });
    return { data: perfume };
  }

  async update(id: number, data: UpdatePerfumeDto) {
    const perfume = await this.findOneById(id);
    await perfume.update({ ...data });
    return { data: perfume };
  }

  async remove(id: number) {
    const perfume = await this.findOneById(id);
    await perfume.destroy();
    return { data: { success: true } };
  }

  async findOneById(id: number, options?) {
    const perfume = await this.repository.findByPk(id, options);
    if (!perfume)
      throw new NotFoundException(`Perfume with ID "${id}" not found`);

    return perfume;
  }
}
