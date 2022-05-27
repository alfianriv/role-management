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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() data: CreateRoleDto) {
    return this.roleService.create(data);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return this.roleService.update(Number(id), data);
  }

  @Put(':id/permission-group/:permissionGroupId')
  assignPermissionGroup(
    @Param('id') id: string,
    @Param('permissionGroupId') permissionGroupId: string,
  ) {
    return this.roleService.assignPermissionGroup(Number(id), Number(permissionGroupId));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(Number(id));
  }
}
