import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto'; // Assuming you have these DTOs
import { TagEntity } from 'src/database/entities';
import { EntityCollection, entityMapping } from 'src/database/entity-mapping';
import { Like } from 'typeorm';

@Injectable()
export class TagService {
    private collectionName: EntityCollection = entityMapping.TAG as EntityCollection;

    constructor(
        private readonly _repo: DatabaseService
    ) { }

    async createTag(params: CreateTagDto): Promise<TagEntity> {
        return this._repo.createOrUpdate<TagEntity>(this.collectionName, { where: { name: params.name } }, params);
    }

    async getAllTags(search: string): Promise<TagEntity[]> {
        const whereClause = search
            ? { where: { name: Like(`%${search}%`) } } // Searching for tags where the name contains the search query
            : {}; // If no search, fetch all tags

        return this._repo.find<TagEntity>(this.collectionName, whereClause);
    }
}
