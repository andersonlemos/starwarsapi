import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanetsController } from './controllers/planets.controller';
import { PlanetSchema } from './schemas/planet.schema';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './controllers/users.controller';
import { AccountService } from './services/account.service';
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
    AccountService,
  ]
})
export class BackofficeModule {}
