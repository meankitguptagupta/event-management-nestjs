import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { TagEntity } from './tag.entity';
import { AttendeeEntity } from './attendee.entity';

@Entity('events')
export class EventEntity extends BaseEntity {

    @Column()
    name: string;

    @Column({ type: 'timestamp', nullable: false })
    eventTimestamp: Date; // Store as a UTC timestamp

    @Column({ default: false })
    isRecurring: boolean;

    @Column({ type: 'enum', enum: ['WEEKLY'], nullable: true })
    recurrenceType?: string;

    @Column({ nullable: true })
    recurrenceCount: number;

    @Column({ type: 'uuid', default: null })
    creatorId?: string;

    @ManyToOne(() => UserEntity, (user) => user.events, { onDelete: 'CASCADE' })
    creator: UserEntity;

    @OneToMany(() => TagEntity, (tag) => tag.event)
    tags: TagEntity[];

    @OneToMany(() => AttendeeEntity, (attendee) => attendee.event)
    attendees: AttendeeEntity[];
}
