import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/Notification/notification';
import { Content } from '@application/entities/Notification/notification-content';

export class PrismaNotificationsMapper {
  static toPrisma(notification: Notification) {
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

  static toDomain(raw: RawNotification) {
    return new Notification(
      {
        recipientId: raw.recipientId,
        category: raw.category,
        content: new Content(raw.content),
        readAt: raw.readAt,
        cancelAt: raw.cancelAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
