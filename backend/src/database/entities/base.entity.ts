import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<T = string> {
  @PrimaryGeneratedColumn('uuid')
  id: T; // Generic type for ID, defaulting to string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // Optional: You can add a method to handle soft delete logic.
  softDelete(): void {
    this.deletedAt = new Date();
  }

  toJSON() {
    // Override in derived class to filter out specific fields if needed
    const { deletedAt, ...rest } = this;
    return rest;
  }
}