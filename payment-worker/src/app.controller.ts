import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Injectable()
export class AppController {
  constructor(readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @EventPattern('payment.process')
  handlePayment(@Payload() data: any) {
    this.logger.log(`Message from order received: ${JSON.stringify(data)}`);
    this.appService.processPayment(data);
  }
}
