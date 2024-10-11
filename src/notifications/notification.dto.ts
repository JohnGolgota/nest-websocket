export class NotificationDto {
  id: number;
  content: string;
  read: boolean;
  userId: number;
  createdAt: Date;
}

export class CreateNotificationDto {
  content: string;
  userId: number;
}

export class UpdateNotificationDto {
  read?: boolean;
}
