import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: '127.0.0.1',
            port: 27017,
            database: 'starwars',
            entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
            synchronize: true,
            useUnifiedTopology: true,
        }),
    ],
})
export class Database {}
