import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule , DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder().setTitle('Dedective Game Backend')
  .setLicense('MIT License','MIT')
  .setDescription('This project is Dedective Game backend project.')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('swagger', app,document)
  await app.listen(3000);
  Logger.log("Starting service port: 3000")
}
bootstrap();
