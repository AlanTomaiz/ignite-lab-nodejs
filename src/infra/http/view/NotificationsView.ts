import { Notification } from '@application/entities/Notification/notification';

export class NotificationsView {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      cancelAt: notification.cancelAt,
      createdAt: notification.createdAt,
    };
  }
}
