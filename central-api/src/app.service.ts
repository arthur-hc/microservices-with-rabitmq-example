import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder(body: object): string {
    this.rabbitMQService.sendMessage(body);
    return 'Order created successfully!';
  }
}
