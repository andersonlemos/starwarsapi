import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AccountController } from './controllers/account.controller';
import { PlanetController } from './controllers/planet.controller';

import { PlanetSchema } from './schemas/planet.schema';
import { UserSchema } from './schemas/user.schema';

import { AccountService } from './services/account.service';
import { PlanetService } from './services/planet.service';

import { AuthService } from '../shared/services/auth.service';
import { JwtStrategy } from '../shared/strategies/jwt.strategy';
import { environment } from '../utils/environment';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: Number(environment.CACHE_SECONDS),
      max: Number(environment.CACHE_OBJECTS),
    }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secretOrPrivateKey: environment.SECRET_KEY.toString(),
      signOptions: {
        expiresIn: 3600,
      },
    }),
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
    AccountController,
    PlanetController,
  ],
  providers: [
    AccountService,
    PlanetService,
    AuthService,
    JwtStrategy,
  ],
})
export class BackofficeModule {}
