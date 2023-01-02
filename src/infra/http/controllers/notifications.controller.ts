import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationsView } from '../view/NotificationsView';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read.notification';
import { UnreadNotification } from '@application/use-cases/unread.notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private getRecipientNotification: GetRecipientNotifications,
  ) {}

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationsView.toHTTP) };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Patch(':notificationId/cancel')
  async cancel(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.execute({ notificationId });
  }

  @Patch(':notificationId/read')
  async read(@Param('notificationId') notificationId: string) {
    await this.readNotification.execute({ notificationId });
  }

  @Patch(':notificationId/unread')
  async unread(@Param('notificationId') notificationId: string) {
    await this.unreadNotification.execute({ notificationId });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { notification: NotificationsView.toHTTP(notification) };
  }
}
