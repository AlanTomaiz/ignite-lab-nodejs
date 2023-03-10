import { Module } from '@nestjs/common';

import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from './Prisma/prisma.service';
import { PrismaNotificationsRepository } from './Prisma/repositories/PrismaNotificationsRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
