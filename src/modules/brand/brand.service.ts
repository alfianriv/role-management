import { PaginationDto } from '@/src/commons/pagination.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandEntity } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(BrandEntity)
    private readonly repository: typeof BrandEntity,
  ) {}

  async create(data: CreateBrandDto) {
    const brand: any = data;
    const saved = await this.repository.create(brand);
    return { data: saved };
  }

  findAll(query: PaginationDto) {
    const [data, total]: any = this.repository.findAndCountAll({
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
    const brand = await this.findOneById(id, {
      include: ['perfumes'],
    });
    return { data: brand };
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findOneById(id);
    await brand.update({ ...updateBrandDto });
    return { data: brand };
  }

  async remove(id: number) {
    const brand = await this.findOneById(id);
    await brand.destroy();
    return { data: { success: true } };
  }

  async findOneById(id: number, options?) {
    const brand = await this.repository.findByPk(id, options);
    if (!brand) throw new NotFoundException(`Brand with ID "${id}" not found`);

    return brand;
  }
}
