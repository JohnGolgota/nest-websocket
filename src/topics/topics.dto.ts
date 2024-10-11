import { UserDto } from "src/users/user.dto";

export class CreateTopicDto {
  name: string;
  description: string;
}

export class UpdateTopicDto {
  name?: string;
  description?: string;
}

export class TopicDto {
  id: number;
  name: string;
  description: string;
  subscriberCount: number;
}

export class TopicWithSubscribersDto {
  id: number;
  name: string;
  description: string;
  subscribers: UserDto[];
}

