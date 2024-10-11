import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TopicsService } from "./topics.service";
import { CreateTopicDto, UpdateTopicDto } from "./topics.dto";

@Controller('topics')
export class TopicsController {

  constructor(
    private readonly topicsService: TopicsService,
  ) { }

  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.uodate(+id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(+id);
  }

  @Post(':id/subscribe/:userId')
  subscribe(@Param('id') id: string, @Param('userId') userId: string) {
    return this.topicsService.subscribe(+id, +userId);
  }

  @Post(':id/unsubscribe/:userId')
  unsubscribe(@Param('id') id: string, @Param('userId') userId: string) {
    return this.topicsService.unsubscribe(+id, +userId);
  }

}
