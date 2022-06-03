import { PaginationDto } from '@/src/commons/pagination.dto';
import { User } from '@/src/decorator/user.decorator';
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';

@ApiTags('discussion')
@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @ApiOperation({ summary: 'Create discussion' })
  @Post()
  create(@User()user, @Body() data: CreateDiscussionDto) {
    return this.discussionService.create(user, data);
  }

  @ApiOperation({ summary: 'Find all discussion' })
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.discussionService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one discussion by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discussionService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Update discussion by id' })
  @Patch(':id')
  update(
    @User() user,
    @Param('id') id: string,
    @Body() data: UpdateDiscussionDto,
  ) {
    return this.discussionService.update(user, Number(id), data);
  }

  @ApiOperation({ summary: 'Delete discussion by id' })
  @Delete(':id')
  remove(@User() user, @Param('id') id: string) {
    return this.discussionService.remove(user, Number(id));
  }
}
