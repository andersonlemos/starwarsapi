import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanetsController } from './controllers/planets.controller';
import { PlanetSchema } from './schemas/planet.schema';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { PlanetService } from './services/planet.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Planet',
        schema: PlanetSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [
    PlanetsController,
    UsersController,
  ],
  providers: [
    UserService,
    PlanetService,
  ],
})
export class BackofficeModule {}
