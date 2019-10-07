import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      logger: console,
    },

  );
  app.enableCors();
  app.use(helmet());
  app.use(compression());

  const options = new DocumentBuilder()
                .setTitle('StarWarsAPI')
                .setDescription('A Star Wars Planets API')
                .setVersion('1.0')
                .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
