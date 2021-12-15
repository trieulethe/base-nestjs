import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './middleware/exception/http.exception.filter';
import { TransformInterceptor } from './middleware/interceptor/transform.interceptor';
import * as morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('api');
  app.enableCors();
  
  const accessLogStream = rfs.createStream('access.log', {
    maxSize: '10M',
    size: '10M',
    interval: '1d', // rotate daily
    path: path.join(process.cwd(), 'log'),
  });
  app.use(morgan('combined', { stream: accessLogStream }));

  const options = new DocumentBuilder()
    .setTitle('base')
    .setDescription('api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
