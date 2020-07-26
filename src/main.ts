import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.enableCors();

    // app.use(rateLimit({
    //   windowMs: process.env.MAX_RATE_SECONDS,
    //   max : process.env.MAX_RATE_LIMIT,
    //   message: process.env.RATE_MESSAGE,
    // }));

    // app.use(helmet());
    // app.use(compression());
    // const options = new DocumentBuilder()
    //               .setTitle('StarWarsAPI')
    //               .setDescription('A Star Wars Planets API')
    //               .setVersion('1.0')
    //               .build();

    // const document = SwaggerModule.createDocument(app, options);
    // SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.DEFAULT_PORT);
}
bootstrap();
