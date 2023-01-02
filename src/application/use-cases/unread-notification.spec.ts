import { NotificationNotFound } from '@errors/notification-not-found';
import { makeNotification } from '@test/factories/notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread.notification';

describe('Unread Notification', () => {
  test('it should be able unread a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const useCase = new UnreadNotification(repository);

    const notification = makeNotification({ readAt: new Date() });
    repository.create(notification);

    // ----
    await useCase.execute({ notificationId: notification.id });
    expect(repository.notifications[0].readAt).toBeNull();
  });

  test('it should not be able unread a non existing notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const useCase = new UnreadNotification(repository);

    expect(() =>
      useCase.execute({ notificationId: 'inexitent-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
