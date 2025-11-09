import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Injectable()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @EventPattern('order.created')
  handleOrderCreated(@Payload() data: any) {
    this.logger.log(`Order received: ${JSON.stringify(data)}`);
    this.appService.processOrder(data);
  }
}
