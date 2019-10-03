import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { PlanetsController } from './backoffice/controllers/planets/planets.controller';

@Module({
  imports: [BackofficeModule],
  controllers: [PlanetsController],
  providers: [],
})
export class AppModule {}
