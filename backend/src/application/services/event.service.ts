// event.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { EventEntity, UserEntity } from 'src/database/entities';
import { EntityCollection, entityMapping } from 'src/database/entity-mapping';
import { UserRole } from 'src/utility/enum/role';
import { In } from 'typeorm';

@Injectable()
export class EventService {

    private collectionName: EntityCollection =
        entityMapping.EVENT as EntityCollection;

    private collectionNameUser: EntityCollection =
        entityMapping.USER as EntityCollection;

    constructor(
        private readonly _repo: DatabaseService
    ) { }

    async createEvent(params: CreateEventDto, user: UserEntity): Promise<EventEntity> {
        return this._repo.create<EventEntity>(this.collectionName, { ...params, creatorId: user.id });
    }

    /**
     * @description Fetch manager or it's employee's event list
     * @param user 
     * @returns 
     */
    async getAllEvents(user: UserEntity): Promise<EventEntity[]> {
        let whereClause = []
        if (user.role == UserRole.MANAGER) {
            whereClause = [{ creatorId: user.id }, { creator: { managerId: user.id } }]
        } else {
            whereClause = [{ creatorId: user.id }]
        }

        return this._repo.find<EventEntity>(this.collectionName, { where: whereClause, relations: ['creator'] });
    }

    async getEventById(id: string): Promise<EventEntity> {
        try {
            return await this._repo.findOne<EventEntity>(this.collectionName, { where: { id }, relations: ['creator'] });
        } catch (err) {

        }
    }

    async updateEvent(id: string, params: UpdateEventDto): Promise<EventEntity> {
        return await this._repo.updateOne<EventEntity>(
            this.collectionName,
            { where: { id } },
            params,
        );
    }

    async deleteEvent(id: string): Promise<void> {
        await this._repo.softDelete(this.collectionName, { where: { id } });
    }

    async count(user: UserEntity): Promise<{ count: number }> {
        let whereClause = {}
        if (user.role == UserRole.MANAGER) {
            whereClause = { creatorId: user.id }
        } else {
            whereClause = { creator: { managerId: user.id } }
        }
        return {
            count: await this._repo.count<EventEntity>(
                this.collectionName,
                { where: whereClause }
            )
        }
    }
}
