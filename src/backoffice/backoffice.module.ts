import { Module } from '@nestjs/common';
import { PlanetsController } from './controllers/planets.controller';

@Module({
  controllers: [PlanetsController],
})
export class BackofficeModule {}
