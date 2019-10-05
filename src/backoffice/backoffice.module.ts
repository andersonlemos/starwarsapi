import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanetController } from './controllers/planet.controller';
import { PlanetSchema } from './schemas/planet.schema';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './controllers/user.controller';
import { AccountService } from './services/account.service';
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
    PlanetController,
    UserController,
  ],
  providers: [
    AccountService,
    PlanetService,
  ],
})
export class BackofficeModule {}
