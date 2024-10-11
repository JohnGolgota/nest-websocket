import { Notification } from 'src/notifications/notification.entity';
import { Topic } from 'src/topics/topic.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => User, user => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, user => user.followers)
  @JoinTable()
  following: User[];

  @ManyToMany(() => Topic, topic => topic.subscribers)
  @JoinTable()
  subscribedTopics: Topic[];

  @ManyToMany(() => Notification, notification => notification.user)
  @JoinTable()
  notifications: Notification[];
}
