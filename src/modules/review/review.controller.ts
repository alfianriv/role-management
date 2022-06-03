import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from '@/src/commons/pagination.dto';
import { User } from '@/src/decorator/user.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Create review' })
  @Post()
  create(@User() user, @Body() data: CreateReviewDto) {
    return this.reviewService.create(user, data);
  }

  @ApiOperation({ summary: 'Find all the reviews' })
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.reviewService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one the review by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Update the review by id' })
  @Patch(':id')
  update(@User() user, @Param('id') id: string, @Body() data: UpdateReviewDto) {
    return this.reviewService.update(user, Number(id), data);
  }

  @ApiOperation({ summary: 'Delete the review by id' })
  @Delete(':id')
  remove(@User() user, @Param('id') id: string) {
    return this.reviewService.remove(user, Number(id));
  }
}
