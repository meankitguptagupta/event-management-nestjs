import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EventEntity } from './event.entity';
import { UserRole } from 'src/utility/enum/role';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MANAGER })
  role: UserRole;

  @Column({ type: 'uuid', default: null })
  managerId?: string;

  @ManyToOne(() => UserEntity, (manager) => manager.employees, { nullable: true })
  manager: UserEntity;

  @OneToMany(() => UserEntity, (employee) => employee.manager)
  employees: UserEntity[];

  @OneToMany(() => EventEntity, (event) => event.creator)
  events: EventEntity[];

  toJSON(): Omit<this, 'deletedAt' | 'softDelete' | 'toJSON'> {
    const { deletedAt, softDelete, password, toJSON, ...rest } = this as any;
    return rest;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
  }
}
