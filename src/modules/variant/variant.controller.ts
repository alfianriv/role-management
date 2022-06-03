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
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@/src/commons/pagination.dto';
import { IsAllow } from '@/src/decorator/is-allow.decorator';

@ApiTags('variant')
@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @ApiOperation({ summary: 'Create variant' })
  @UseGuards(new IsAllow('variants:create'))
  @Post()
  create(@Body() data: CreateVariantDto) {
    return this.variantService.create(data);
  }

  @ApiOperation({ summary: 'Find all variant' })
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.variantService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one variant by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Update variant by id' })
  @UseGuards(new IsAllow('variants:update'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateVariantDto) {
    return this.variantService.update(Number(id), data);
  }

  @ApiOperation({ summary: 'Delete variant by id' })
  @UseGuards(new IsAllow('variants:delete'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantService.remove(Number(id));
  }
}
