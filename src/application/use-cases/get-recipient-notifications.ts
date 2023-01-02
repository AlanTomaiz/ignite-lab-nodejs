import { Notification } from '@application/entities/Notification/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private repository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.repository.findManyByRecipientId(
      recipientId,
    );

    return { notifications };
  }
}
