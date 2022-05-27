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
} from '@nestjs/common';
import { PermissionGroupService } from './permission-group.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('permission-group')
@Controller('permission-group')
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  @Post()
  create(@Body() data: CreatePermissionGroupDto) {
    return this.permissionGroupService.create(data);
  }

  @Get()
  findAll() {
    return this.permissionGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionGroupService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePermissionGroupDto) {
    return this.permissionGroupService.update(Number(id), data);
  }

  @Put(':id/role/:roleId')
  assignRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.permissionGroupService.assignRole(Number(id), Number(roleId));
  }

  @ApiOperation({ summary: 'Revoke role from permission group' })
  @Delete(':id/role/:roleId')
  revokeRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.permissionGroupService.revokeRole(Number(id), Number(roleId));
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionGroupService.remove(Number(id));
  }
}
