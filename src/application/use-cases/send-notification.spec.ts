import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  test('it should be able send a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const useCase = new SendNotification(repository);

    const { notification } = await useCase.execute({
      content: 'This is a notification',
      category: 'study',
      recipientId: 'exemple-recipient-id',
    });

    expect(notification).toBeTruthy();
    expect(repository.notifications).toHaveLength(1);
    expect(repository.notifications[0]).toEqual(notification);
  });
});
