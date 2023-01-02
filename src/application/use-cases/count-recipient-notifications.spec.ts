import { makeNotification } from '@test/factories/notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count Notifications', () => {
  test('it should be able to count many notifications by recipient id', async () => {
    const repository = new InMemoryNotificationsRepository();
    const useCase = new CountRecipientNotifications(repository);

    repository.create(makeNotification({ recipientId: 'recipient-test' }));
    repository.create(makeNotification({ recipientId: 'recipient-test' }));
    repository.create(makeNotification());

    const { count } = await useCase.execute({ recipientId: 'recipient-test' });
    expect(count).toEqual(2);
  });
});
