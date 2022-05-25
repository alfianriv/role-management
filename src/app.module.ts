import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionGroupModule } from './modules/permission-group/permission-group.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [UserModule, RoleModule, PermissionGroupModule, PermissionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
