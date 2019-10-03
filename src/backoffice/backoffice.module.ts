import { Module } from '@nestjs/common';
import { PlanetasController } from './controllers/planetas/planetas.controller';

@Module({
  controllers: [PlanetasController]
})
export class BackofficeModule {}
