import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { PlanetasController } from './backoffice/controllers/planetas/planetas.controller';

@Module({
  imports: [BackofficeModule],
  controllers: [PlanetasController],
  providers: [],
})
export class AppModule {}
