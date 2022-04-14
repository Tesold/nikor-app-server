import { ValidationPipe } from 'src/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { Console } from 'console';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}...`),
  );
}

start();
