import { forwardRef, Module } from '@nestjs/common';
import { PermissionGroupService } from './permission-group.service';
import { PermissionGroupController } from './permission-group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionGroupEntity } from './entities/permission-group.entity';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PermissionGroupEntity]),
    forwardRef(() => RoleModule),
    forwardRef(() => PermissionModule),
  ],
  controllers: [PermissionGroupController],
  providers: [PermissionGroupService],
  exports: [PermissionGroupService],
})
export class PermissionGroupModule {}
