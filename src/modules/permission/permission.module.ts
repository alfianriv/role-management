import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionGroupModule } from '../permission-group/permission-group.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PermissionEntity]),
    forwardRef(() => PermissionGroupModule),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
