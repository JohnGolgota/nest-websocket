import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "./notification.entity";
import { Repository } from "typeorm";
import { CreateNotificationDto } from "./notification.dto";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) { }

  create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationsRepository.create(createNotificationDto);
    return this.notificationsRepository.save(notification);
  }

  findAllForUser(userId: number) {
    return this.notificationsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  async markAsRead(id: number) {
    await this.notificationsRepository.update(id, { read: true });
    return this.notificationsRepository.findOne({ where: { id } });
  }
}
