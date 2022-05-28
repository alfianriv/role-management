import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionGroupModule } from './modules/permission-group/permission-group.module';
import { PermissionModule } from './modules/permission/permission.module';
import { SequelizeModule } from './config/sequelize/sequelize.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorizationMiddleware } from './middleware/authorization.middleware';
import { SequelizeModule as SqlModule } from '@nestjs/sequelize';
import { UserEntity } from './modules/user/entities/user.entity';

@Module({
  imports: [
    SqlModule.forFeature([UserEntity]),
    UserModule,
    RoleModule,
    PermissionGroupModule,
    PermissionModule,
    SequelizeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).exclude('auth/*').forRoutes('*');
  }
}
