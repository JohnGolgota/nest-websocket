import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./notification.dto";

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly nofiticationsService: NotificationsService,
  ) { }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.nofiticationsService.create(createNotificationDto);
  }

  @Get(':userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.nofiticationsService.findAllForUser(+userId);
  }

  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.nofiticationsService.markAsRead(+id);
  }
}
