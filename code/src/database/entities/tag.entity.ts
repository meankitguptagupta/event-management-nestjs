import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EventEntity } from './event.entity';

@Entity('tags')
export class TagEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => EventEntity, (event) => event.tags, { onDelete: 'CASCADE' })
  event: EventEntity;
}
