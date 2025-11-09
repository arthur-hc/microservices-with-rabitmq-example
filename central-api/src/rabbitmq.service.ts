/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: any;
  private channel: amqp.Channel;
  private readonly queue = 'order-queue';

  async onModuleInit() {
    this.connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });
    console.log('Connected to RabbitMQ successfully');
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
    console.log('RabbitMQ connection closed successfully');
  }

  sendMessage(content: any) {
    const buffer = Buffer.from(
      JSON.stringify({ pattern: 'order.created', data: content }),
    );
    this.channel.sendToQueue(this.queue, buffer);
    console.log('Message sent:', content);
  }
}
