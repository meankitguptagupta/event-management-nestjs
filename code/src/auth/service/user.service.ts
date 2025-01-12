// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from 'src/database/entities';
import { EntityCollection, entityMapping } from 'src/database/entity-mapping';

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
}
