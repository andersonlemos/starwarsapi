import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/starwarsapi', {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
