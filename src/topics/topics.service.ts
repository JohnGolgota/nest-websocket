import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Topic } from "./topic.entity";
import { User } from "src/users/user.entity";
import { CreateTopicDto, UpdateTopicDto } from "./topics.dto";

@Injectable()
export class TopicsService {

  constructor(
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  create(createTopicDto: CreateTopicDto) {
    const topic = this.topicRepository.create(createTopicDto);
    return this.topicRepository.save(topic);
  }

  findAll() {
    return this.topicRepository.find();
  }

  findOne(id: number) {
    return this.topicRepository.findOne({ where: { id } });
  }

  async uodate(id: number, updateTopicDto: UpdateTopicDto) {
    await this.topicRepository.update(id, updateTopicDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.topicRepository.delete(id);
  }

  async subscribe(topicId: number, userId: number) {
    const topic = await this.findOne(topicId);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!topic.subscribers) {
      topic.subscribers = [];
    }
    topic.subscribers.push(user);
    return this.topicRepository.save(topic);
  }

  async unsubscribe(topicId: number, userId: number) {
    const topic = await this.findOne(topicId);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    topic.subscribers = topic.subscribers.filter(subscriber => subscriber.id !== user.id);
    return this.topicRepository.save(topic);
  }

}
