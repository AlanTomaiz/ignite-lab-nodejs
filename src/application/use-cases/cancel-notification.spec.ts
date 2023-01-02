import { NotificationNotFound } from '@errors/notification-not-found';
import { makeNotification } from '@test/factories/notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';

describe('Cancel Notification', () => {
  test('it should be able to cancel a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const useCase = new CancelNotification(repository);

    const notification = makeNotification();
    repository.create(notification);

    // ----
    await useCase.execute({ notificationId: notification.id });

    expect(repository.notifications[0].cancelAt).toEqual(expect.any(Date));
  });

  test('it should not be able to cancel a non existing notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const useCase = new CancelNotification(repository);

    expect(() =>
      useCase.execute({ notificationId: 'inexitent-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
