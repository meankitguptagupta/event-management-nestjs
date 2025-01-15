import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('attendees')
export class AttendeeEntity extends BaseEntity {

    @Column({ type: 'uuid' })
    eventId?: string;

    @Column({ type: 'uuid' })
    userId?: string;


    @ManyToOne(() => EventEntity, (event) => event.attendees, { onDelete: 'CASCADE' })
    event: EventEntity;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    user: UserEntity;
}
