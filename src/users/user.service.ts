import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }

  async followUser(userId: number, targetUserId: number) {
    const user = await this.findOne(userId);
    const targetUser = await this.findOne(targetUserId);
    if (!user.followers) {
      user.followers = [];
    }
    user.followers.push(targetUser);
    return this.userRepository.save(user);
  }

  async unfollowUser(userId: number, targetUserId: number) {
    const user = await this.findOne(userId);
    const targetUser = await this.findOne(targetUserId);
    user.followers = user.followers.filter(follower => follower.id !== targetUser.id);
    return this.userRepository.save(user);
  }

}
