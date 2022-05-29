import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAllow } from '@/src/decorator/is-allow.decorator';
import { PaginationDto } from '@/src/commons/pagination.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @UseGuards(new IsAllow('users:write'))
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @ApiOperation({ summary: 'Find all user' })
  @UseGuards(new IsAllow('users:read'))
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one user' })
  @UseGuards(new IsAllow('users:read'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Update user by id' })
  @UseGuards(new IsAllow('users:update'))
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(Number(id), data);
  }

  @ApiOperation({ summary: 'Assign role to user' })
  @UseGuards(new IsAllow('users:update'))
  @Put(':id/role/:roleId')
  assignRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.userService.assignRole(Number(id), Number(roleId));
  }

  @ApiOperation({ summary: 'Revoke role from user' })
  @UseGuards(new IsAllow('users:update'))
  @Put(':id/role/:roleId')
  revokeRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.userService.revokeRole(Number(id), Number(roleId));
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @UseGuards(new IsAllow('users:delete'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}
