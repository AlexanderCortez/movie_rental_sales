import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MainModule } from './main.module';

const bootstrap = async () => {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  const options = new DocumentBuilder()
    .setTitle('Movie Rental')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
