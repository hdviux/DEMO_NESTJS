import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationErrorFilter } from 'validation-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationErrorFilter());
  await app.listen(3000);
}
bootstrap();
