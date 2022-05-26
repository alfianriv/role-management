import { Module } from '@nestjs/common';
import { SequelizeModule as SqlModule } from '@nestjs/sequelize';
import { config } from './sequelize.config';

@Module({
  imports: [SqlModule.forRoot(config)],
})
export class SequelizeModule {}
