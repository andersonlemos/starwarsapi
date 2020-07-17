import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { Database } from './database.module';
import { Environments } from './environment.module';
@Module({
  imports: [
    Environments,
    Database,
    BackofficeModule
  ]
})
export class AppModule {}
