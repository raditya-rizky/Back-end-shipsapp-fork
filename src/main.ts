import '@wahyubucil/nestjs-zod-openapi/boot'

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { patchNestjsSwagger } from '@wahyubucil/nestjs-zod-openapi'

import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mengaktifkan CORS
  app.enableCors({});

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .build()

  patchNestjsSwagger({ schemasSort: 'alpha' }) // <-- add this. This function should run before the `SwaggerModule.createDocument` function.

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(3000);
}
bootstrap();
