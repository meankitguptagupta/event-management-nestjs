import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EventEntity } from './event.entity';

@Entity('tags')
export class TagEntity extends BaseEntity<number> { // Specify the ID type as number
    @PrimaryGeneratedColumn() // Numeric ID instead of UUID
    id: number;

    @Column()
    name: string;

    toJSON(): Omit<this, 'deletedAt' | 'softDelete' | 'toJSON'> {
        const { deletedAt, createdAt, updatedAt, ...rest } = this as any;
        return rest;
    }
}
