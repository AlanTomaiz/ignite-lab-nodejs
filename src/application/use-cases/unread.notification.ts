import { NotificationNotFound } from '@errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface UnreadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private repository: NotificationsRepository) {}

  async execute(request: UnreadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.repository.findById(notificationId);
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();
    await this.repository.save(notification);
  }
}
