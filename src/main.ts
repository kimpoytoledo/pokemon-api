import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './presentation/app.module';
import { ValidationPipe } from '@nestjs/common';
import { JsonMiddleware } from './presentation/middleware/response-format.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use validation pipe to validate incoming requests
  app.useGlobalPipes(new ValidationPipe());

  // Define Swagger document options
  const options = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  // Create a Swagger document from the defined options
  const document = SwaggerModule.createDocument(app, options);

  // Serve the Swagger UI from the '/api-docs' route
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}

bootstrap();
