import { NotificationNotFound } from '@errors/notification-not-found';
import { makeNotification } from '@test/factories/notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { ReadNotification } from './read.notification';

describe('Read Notification', () => {
  test('it should be able read a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const useCase = new ReadNotification(repository);

    const notification = makeNotification();
    repository.create(notification);

    // ----
    await useCase.execute({ notificationId: notification.id });
    expect(repository.notifications[0].readAt).toEqual(expect.any(Date));
  });

  test('it should not be able read a non existing notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const useCase = new ReadNotification(repository);

    expect(() =>
      useCase.execute({ notificationId: 'inexitent-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
