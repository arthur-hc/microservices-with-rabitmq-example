import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  processPayment(data: object) {
    // Logic to process the payment
    console.log(`Processing payment for order: ${JSON.stringify(data)}`);
  }
}
