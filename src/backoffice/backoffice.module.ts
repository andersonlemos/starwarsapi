import { Module } from '@nestjs/common';
import { PlanetsHttpModule } from './planets-http.module';

@Module({
  imports:[PlanetsHttpModule]
})
export class BackofficeModule {}
