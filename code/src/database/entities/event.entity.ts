import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { TagEntity } from './tag.entity';
import { AttendeeEntity } from './attendee.entity';

@Entity('events')
export class EventEntity extends BaseEntity {

    @Column()
    name: string;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'time' })
    time: string;

    @Column()
    timezone: string;

    @Column({ default: false })
    isRecurring: boolean;

    @Column({ type: 'enum', enum: ['WEEKLY'], nullable: true })
    recurrenceType: 'WEEKLY';

    @Column({ nullable: true })
    recurrenceCount: number;

    @ManyToOne(() => UserEntity, (user) => user.events, { onDelete: 'CASCADE' })
    creator: UserEntity;

    @OneToMany(() => TagEntity, (tag) => tag.event)
    tags: TagEntity[];

    @OneToMany(() => AttendeeEntity, (attendee) => attendee.event)
    attendees: AttendeeEntity[];
}
