import { Module } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { PerfumeController } from './perfume.controller';

@Module({
  controllers: [PerfumeController],
  providers: [PerfumeService],
})
export class PerfumeModule {}
