import { Notification } from './notification';
import { Content } from './notification-content';

describe('Notification', () => {
  test('it should be able create a new notification', () => {
    const notification = new Notification({
      content: new Content('This is a notification'),
      category: 'test',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
