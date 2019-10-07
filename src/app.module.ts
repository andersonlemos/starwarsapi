import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module';
import { environment } from './environment';

@Module({
  imports: [
    MongooseModule.forRoot( environment.MONGODB_CONNECTIONSTRING, {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
