import { ValidationPipe } from "src/pipes/validation.pipe";
import {NestFactory} from "@nestjs/core";
import { Console } from "console";
import { AppModule } from "./app.module";
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function start()
{
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      });

    app.useGlobalPipes(new ValidationPipe())

    await app.listen();
}

start();