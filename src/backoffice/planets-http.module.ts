import { CacheModule, HttpModule,Module } from '@nestjs/common';
import { PlanetsModule } from './planets.module';
import { PlanetsController } from './controllers/planet.controller';
import { PlanetService } from './services/planet.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
            ttl: Number(process.env.CACHE_SECONDS),
            max: Number(process.env.CACHE_OBJECTS),
          }),
    PlanetsModule
  ],
  providers: [PlanetService],
  controllers: [PlanetsController]
})
export class PlanetsHttpModule {}
