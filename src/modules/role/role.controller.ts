import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Create role' })
  @Post()
  create(@Body() data: CreateRoleDto) {
    return this.roleService.create(data);
  }

  @ApiOperation({ summary: 'Find all role' })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: 'Find one role by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Update role by id' })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return this.roleService.update(Number(id), data);
  }

  @ApiOperation({ summary: 'Assign permission group to role' })
  @Put(':id/permission-group/:permissionGroupId')
  assignPermissionGroup(
    @Param('id') id: string,
    @Param('permissionGroupId') permissionGroupId: string,
  ) {
    return this.roleService.assignPermissionGroup(
      Number(id),
      Number(permissionGroupId),
    );
  }

  @ApiOperation({ summary: 'Revoke permission group from role' })
  @Delete(':id/permission-group/:permissionGroupId')
  revokePermissionGroup(
    @Param('id') id: string,
    @Param('permissionGroupId') permissionGroupId: string,
  ) {
    return this.roleService.revokePermissionGroup(
      Number(id),
      Number(permissionGroupId),
    );
  }

  @ApiOperation({ summary: 'Delete role by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(Number(id));
  }
}
