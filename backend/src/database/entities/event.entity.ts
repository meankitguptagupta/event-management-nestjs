import {
    Entity,
    Column,
    ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('events')
export class EventEntity extends BaseEntity {
    @Column()
    name: string;

    @Column({ type: 'timestamp', nullable: false })
    eventTimestamp: Date;

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

    // Use number[] instead of string[]
    @Column('simple-array')
    tags: number[] = [];

    @Column('simple-array')
    attendees: string[] = [];
}

