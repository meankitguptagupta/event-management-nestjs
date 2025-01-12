// event.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { EventEntity } from 'src/database/entities';
import { EntityCollection, entityMapping } from 'src/database/entity-mapping';

@Injectable()
export class EventService {

    private collectionName: EntityCollection =
        entityMapping.EVENT as EntityCollection;

    constructor(
        private readonly _repo: DatabaseService
    ) { }

    async createEvent(params: CreateEventDto): Promise<EventEntity> {
        return this._repo.create<EventEntity>(this.collectionName, params);
    }

    async getAllEvents(): Promise<EventEntity[]> {
        return this._repo.find<EventEntity>(this.collectionName, { relations: ['tags', 'attendees', 'creator'] });
    }

    async getEventById(id: string): Promise<EventEntity> {
        return this._repo.findOne<EventEntity>(this.collectionName, { where: { id }, relations: ['tags', 'attendees', 'creator'] });
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
}
