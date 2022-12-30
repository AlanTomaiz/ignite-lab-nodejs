import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../http/dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { notification };
  }
}