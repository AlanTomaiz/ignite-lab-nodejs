import { makeNotification } from '@test/factories/notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Notifications', () => {
  test('it should be able get all recipient notifications', async () => {
    const repository = new InMemoryNotificationsRepository();
    const useCase = new GetRecipientNotifications(repository);

    repository.create(makeNotification({ recipientId: 'recipient-test' }));
    repository.create(makeNotification({ recipientId: 'recipient-test' }));
    repository.create(makeNotification());

    const { notifications } = await useCase.execute({
      recipientId: 'recipient-test',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-test' }),
        expect.objectContaining({ recipientId: 'recipient-test' }),
      ]),
    );
  });
});
