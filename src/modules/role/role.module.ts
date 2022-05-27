import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleEntity } from './entities/role.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionGroupModule } from '../permission-group/permission-group.module';

@Module({
  imports: [
    SequelizeModule.forFeature([RoleEntity]),
    forwardRef(() => PermissionGroupModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
