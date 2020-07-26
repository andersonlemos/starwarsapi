import { Module } from '@nestjs/common';
import { PlanetsHttpModule } from './modules/planets-http.module';

@Module({
    imports: [PlanetsHttpModule],
})
export class BackofficeModule {}
