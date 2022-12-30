import { Content } from './notification-content';

describe('Notification Content', () => {
  test('it should be able create a notification content', () => {
    const content = new Content('This is a notification');
    expect(content).toBeTruthy();
  });

  test('it should be able throw error if content then less 5 caracters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  test('it should be able throw error if content then more 255 caracters', () => {
    expect(() => new Content('a'.repeat(256))).toThrow();
  });
});
