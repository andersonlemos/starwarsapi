import { Module } from '@nestjs/common';
import { PlanetsController } from './controllers/planets/planets.controller';

@Module({
  controllers: [PlanetsController],
})
export class BackofficeModule {}
