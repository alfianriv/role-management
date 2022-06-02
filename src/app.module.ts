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
import { BrandModule } from './modules/brand/brand.module';
import { PerfumeModule } from './modules/perfume/perfume.module';
import { VariantModule } from './modules/variant/variant.module';
import { DiscussionModule } from './modules/discussion/discussion.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    SqlModule.forFeature([UserEntity]),
    UserModule,
    RoleModule,
    PermissionGroupModule,
    PermissionModule,
    SequelizeModule,
    AuthModule,
    BrandModule,
    PerfumeModule,
    VariantModule,
    DiscussionModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).exclude('auth/*').forRoutes('*');
  }
}
