import { NotificationNotFound } from '@errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface ReadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class ReadNotification {
  constructor(private repository: NotificationsRepository) {}

  async execute(request: ReadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.repository.findById(notificationId);
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();
    await this.repository.save(notification);
  }
}
