import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionGroupModule } from './modules/permission-group/permission-group.module';
import { PermissionModule } from './modules/permission/permission.module';
import { SequelizeModule } from './config/sequelize/sequelize.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PermissionGroupModule,
    PermissionModule,
    SequelizeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
