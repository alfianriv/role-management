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
} from '@nestjs/common';
import { PermissionGroupService } from './permission-group.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAllow } from '@/src/decorator/is-allow.decorator';

@ApiTags('permission-group')
@Controller('permission-group')
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  @ApiOperation({ summary: 'Create permission group' })
  @UseGuards(new IsAllow('permission-groups:create'))
  @Post()
  create(@Body() data: CreatePermissionGroupDto) {
    return this.permissionGroupService.create(data);
  }

  @ApiOperation({ summary: 'Find all permission group' })
  @UseGuards(new IsAllow('permission-groups:read'))
  @Get()
  findAll() {
    return this.permissionGroupService.findAll();
  }

  @ApiOperation({ summary: 'Find one permission group by id' })
  @UseGuards(new IsAllow('permission-groups:read'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionGroupService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Update permission group by id' })
  @UseGuards(new IsAllow('permission-groups:update'))
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePermissionGroupDto) {
    return this.permissionGroupService.update(Number(id), data);
  }

  @ApiOperation({ summary: 'Assign role to permission group' })
  @UseGuards(new IsAllow('permission-groups:update'))
  @Put(':id/role/:roleId')
  assignRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.permissionGroupService.assignRole(Number(id), Number(roleId));
  }

  @ApiOperation({ summary: 'Revoke role from permission group' })
  @UseGuards(new IsAllow('permission-groups:update'))
  @Delete(':id/role/:roleId')
  revokeRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.permissionGroupService.revokeRole(Number(id), Number(roleId));
  }

  @ApiOperation({ summary: 'Assign permission to permission group' })
  @UseGuards(new IsAllow('permission-groups:update'))
  @Put(':id/permission/:permissionId')
  assignPermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.permissionGroupService.assignPermission(
      Number(id),
      Number(permissionId),
    );
  }

  @ApiOperation({ summary: 'Revoke permission from permission group' })
  @UseGuards(new IsAllow('permission-groups:update'))
  @Delete(':id/permission/:permissionId')
  revokePermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.permissionGroupService.revokePermission(
      Number(id),
      Number(permissionId),
    );
  }

  @ApiOperation({ summary: 'Delete permission group by id' })
  @UseGuards(new IsAllow('permission-groups:delete'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionGroupService.remove(Number(id));
  }
}
