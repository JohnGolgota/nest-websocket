import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Topic } from "./topic.entity";
import { TopicsController } from "./topics.controller";
import { TopicsService } from "./topics.service";
import { User } from "src/users/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule { }
