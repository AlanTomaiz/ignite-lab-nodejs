import {
  Notification,
  NotificationProps,
} from '@application/entities/Notification/notification';
import { Content } from '@application/entities/Notification/notification-content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('This is a notification'),
    category: 'test',
    recipientId: 'example-recipient-id',
    ...override,
  });
}
