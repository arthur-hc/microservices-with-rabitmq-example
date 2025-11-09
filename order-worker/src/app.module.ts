import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5672',
          ],
          queue: 'payments-queue',
          queueOptions: { durable: true },
        },
      },
      // Register other microservice clients here if needed
    ]),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
