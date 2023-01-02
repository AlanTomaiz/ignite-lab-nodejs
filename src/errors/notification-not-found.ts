export class NotificationNotFound extends Error {
  constructor() {
    super('Notification not found.');
    this.name = 'Notification not found';
  }
}
