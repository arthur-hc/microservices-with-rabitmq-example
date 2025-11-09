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
        queue: 'payments-queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
  console.log(
    'Payment Worker connected to RabbitMQ and listening on payments-queue',
  );
}
bootstrap().catch((error) => {
  console.error('Error while starting the Payment Worker:', error);
});
