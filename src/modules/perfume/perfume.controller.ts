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
import { PerfumeService } from './perfume.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { PaginationDto } from '@/src/commons/pagination.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAllow } from '@/src/decorator/is-allow.decorator';

@ApiTags('perfume')
@Controller('perfume')
export class PerfumeController {
  constructor(private readonly perfumeService: PerfumeService) {}

  @ApiOperation({ summary: 'Create perfume' })
  @UseGuards(new IsAllow('perfumes:create'))
  @Post()
  create(@Body() data: CreatePerfumeDto) {
    return this.perfumeService.create(data);
  }

  @ApiOperation({ summary: 'Find all perfume' })
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.perfumeService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one perfume by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfumeService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Update perfume by id' })
  @UseGuards(new IsAllow('perfumes:update'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePerfumeDto) {
    return this.perfumeService.update(Number(id), data);
  }

  @ApiOperation({ summary: 'Delete perfume by id' })
  @UseGuards(new IsAllow('perfumes:delete'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfumeService.remove(Number(id));
  }
}
