import { PaginationDto } from '@/src/commons/pagination.dto';
import { IsAllow } from '@/src/decorator/is-allow.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'Create brand' })
  @UseGuards(new IsAllow('brands:create'))
  @Post()
  create(@Body() data: CreateBrandDto) {
    return this.brandService.create(data);
  }

  @ApiOperation({ summary: 'Find all brand' })
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.brandService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one brand by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Update brand by id' })
  @UseGuards(new IsAllow('brands:update'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateBrandDto) {
    return this.brandService.update(Number(id), data);
  }

  @ApiOperation({ summary: 'Delete brand by id' })
  @UseGuards(new IsAllow('brands:delete'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(Number(id));
  }
}
