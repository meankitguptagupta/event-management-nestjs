import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto'; // Assuming you have these DTOs
import { TagEntity } from 'src/database/entities';
import { EntityCollection, entityMapping } from 'src/database/entity-mapping';

@Injectable()
export class TagService {
    private collectionName: EntityCollection = entityMapping.TAG as EntityCollection;

    constructor(
        private readonly _repo: DatabaseService
    ) { }

    async createTag(params: CreateTagDto): Promise<TagEntity> {
        return this._repo.create<TagEntity>(this.collectionName, params);
    }

    async getAllTags(): Promise<TagEntity[]> {
        return this._repo.find<TagEntity>(this.collectionName);
    }

    async getTagById(id: string): Promise<TagEntity> {
        return this._repo.findOne<TagEntity>(this.collectionName, { where: { id } });
    }

    async updateTag(id: string, params: UpdateTagDto): Promise<TagEntity> {
        return await this._repo.updateOne<TagEntity>(
            this.collectionName,
            { where: { id } },
            params,
        );
    }

    async deleteTag(id: string): Promise<void> {
        await this._repo.softDelete(this.collectionName, { where: { id } });
    }
}
