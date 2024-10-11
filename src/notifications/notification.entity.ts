import { User } from "src/users/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Notification {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column({ default: false })
	read: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToMany(
		() => User,
		(user) => user.notifications,
	)
	user: User[];
}
