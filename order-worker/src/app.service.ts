import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}

  processOrder(orderData: { processId: number }) {
    console.log(`Processing order: ${JSON.stringify(orderData)}`);
    this.paymentClient.emit('payment.process', orderData);
    console.log('Payment process event emitted', {
      pattern: 'payment.process',
      orderData,
    });
  }
}
