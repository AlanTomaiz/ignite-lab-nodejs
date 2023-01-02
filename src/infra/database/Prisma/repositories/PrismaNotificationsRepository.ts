import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Notification } from '@application/entities/Notification/notification';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationsMapper } from '../mappers/PrismaNotificationsMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const raw = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });

    if (!raw) return null;
    return PrismaNotificationsMapper.toDomain(raw);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return (
      await this.prismaService.notification.findMany({ where: { recipientId } })
    ).map(PrismaNotificationsMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.prismaService.notification.count({ where: { recipientId } });
  }

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: PrismaNotificationsMapper.toPrisma(notification),
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationsMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: { id: notification.id },
      data: raw,
    });
  }
}
