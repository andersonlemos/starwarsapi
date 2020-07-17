import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Planets } from "./backoffice/entities/planet.entity";

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: "mongodb",
            host: "127.0.0.1",
            port: 27017,
            database: "starwars",
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true
        })
    ]
})
export class Database {}