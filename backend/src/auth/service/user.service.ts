// src/user/user.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from 'src/database/entities';
import { EntityCollection, entityMapping } from 'src/database/entity-mapping';
import { CreateUserDto } from '../dto/user.dto';
import { UserRole } from 'src/utility/enum/role';

@Injectable()
export class UserService {

    private collectionName: EntityCollection =
        entityMapping.USER as EntityCollection;

    constructor(
        private readonly _repo: DatabaseService
    ) { }

    async create(userData: Partial<UserEntity>): Promise<UserEntity> {
        return this._repo.create<UserEntity>(this.collectionName, userData);
    }

    async findByEmail(email: string): Promise<UserEntity | undefined> {
        return this._repo.findOne<UserEntity>(this.collectionName, { where: { email } });
    }

    async findById(id: string): Promise<UserEntity | undefined> {
        return this._repo.findOne<UserEntity>(this.collectionName, { where: { id } });
    }

    async findEmployee(managerId: string): Promise<UserEntity[] | undefined> {
        return this._repo.find<UserEntity>(this.collectionName, { where: { managerId } });
    }

    async countEmployee(managerId: string): Promise<{ count: number }> {
        return {
            count: await this._repo.count<UserEntity>(this.collectionName, { where: { managerId } })
        }
    }

    // Method to add an employee under a manager
    async addEmployee(createUserDto: CreateUserDto, managerId: string): Promise<UserEntity> {
        const { email } = createUserDto;

        // Check if the employee already exists with the provided email
        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Create the employee (user)
        const employee = this.create({
            ...createUserDto,
            role: UserRole.EMPLOYEE,  // Ensure the role is set to 'employee'
            managerId: managerId,  // Associate the manager with this user
        });

        return employee;
    }
}
