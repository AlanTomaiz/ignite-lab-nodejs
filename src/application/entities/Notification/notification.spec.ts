import { makeNotification } from '@test/factories/notifications';

describe('Notification', () => {
  test('it should be able create a new notification', () => {
    const notification = makeNotification();
    expect(notification).toBeTruthy();
  });
});
