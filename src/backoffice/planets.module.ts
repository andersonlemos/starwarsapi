import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planets } from './entities/planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planets])],
  exports: [TypeOrmModule]
})
export class PlanetsModule {}