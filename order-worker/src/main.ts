import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'order-queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
  console.log(
    'Order Worker connected to RabbitMQ and listening on order-queue',
  );
}
bootstrap().catch((error) => {
  console.error('Error while starting the Order Worker:', error);
});
