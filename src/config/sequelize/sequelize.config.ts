import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const config: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'role-management',
  autoLoadModels: true,
};
