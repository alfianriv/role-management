import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Create permission' })
  @Post()
  create(@Body() data: CreatePermissionDto) {
    return this.permissionService.create(data);
  }

  @ApiOperation({ summary: 'Find all permission' })
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @ApiOperation({ summary: 'Find one permission by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Update permission by id' })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePermissionDto) {
    return this.permissionService.update(Number(id), data);
  }

  @ApiOperation({ summary: 'Assign permission group to permission' })
  @Put(':id/permission-group/:permissionGroupId')
  assignPermissionGroup(
    @Param('id') id: string,
    @Param('permissionGroupId') permissionGroupId: string,
  ) {
    return this.permissionService.assignPermissionGroup(
      Number(id),
      Number(permissionGroupId),
    );
  }

  @ApiOperation({ summary: 'Revoke permission group from permission' })
  @Delete(':id/permission-group/:permissionGroupId')
  revokePermissionGroup(
    @Param('id') id: string,
    @Param('permissionGroupId') permissionGroupId: string,
  ) {
    return this.permissionService.revokePermissionGroup(
      Number(id),
      Number(permissionGroupId),
    );
  }

  @ApiOperation({ summary: 'Delete permission group by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(Number(id));
  }
}
