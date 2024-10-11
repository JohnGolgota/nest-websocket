import { TopicDto } from "src/topics/topics.dto";

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export class UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}

export class UserDto {
  id: number;
  username: string;
  email: string;
  followersCount: number;
  followingCount: number;
  subscribedTopicsCount: number;
}

export class UserBasicDto {
  id: number;
  username: string;
}

export class UserDetailsDto {
  id: number;
  username: string;
  email: string;
  followers: UserBasicDto[];
  following: UserBasicDto[];
  subscribedTopics: TopicDto[];
}
