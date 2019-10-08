import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanetController } from './controllers/planet.controller';
import { PlanetSchema } from './schemas/planet.schema';
import { PlanetService } from './services/planet.service';
import { environment } from '../environment';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: Number(environment.CACHE_SECONDS),
      max: Number(environment.CACHE_OBJECTS),
    }),
    MongooseModule.forFeature([
      {
        name: 'Planet',
        schema: PlanetSchema,
      }
    ]),
  ],
  controllers: [
    PlanetController,
  ],
  providers: [
    PlanetService,
  ],
})
export class BackofficeModule {}
