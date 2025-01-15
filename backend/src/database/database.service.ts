import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { EventEntity, TagEntity, UserEntity } from './entities';
import { EntityCollection, entityMapping } from './entity-mapping';

export class DatabaseService {
  // Stores repository instances for different entities.
  private models: Record<string, Repository<any>> = {};

  // Maps entity names to their respective entity classes.
  private entityMap: Record<string, any> = {};

  /**
   * Constructor to initialize repositories and entity mappings.
   * @param _job Repository for JobEntity.
   * @param _user Repository for UserEntity.
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly _user: Repository<UserEntity>,
    @InjectRepository(EventEntity)
    private readonly _event: Repository<EventEntity>,
    @InjectRepository(TagEntity)
    private readonly _tag: Repository<TagEntity>,
  ) {
    // Initialize the models mapping for all entities.
    this.models[entityMapping.USER] = this._user;
    this.models[entityMapping.EVENT] = this._event;
    this.models[entityMapping.TAG] = this._tag;

    // Initialize the entity mapping.
    this.entityMap[entityMapping.USER] = UserEntity;
    this.entityMap[entityMapping.EVENT] = EventEntity;
    this.entityMap[entityMapping.TAG] = TagEntity;
  }

  /**
   * Checks if the repository for the specified collection exists.
   * @param collection The name of the collection.
   * @returns The repository for the collection.
   * @throws Error if the repository is not found.
   */
  private getRepository(collection: EntityCollection): Repository<any> {
    const repo = this.models[collection];
    if (!repo) {
      throw new Error(`Entity for collection "${collection}" not found.`);
    }
    return repo;
  }

  async createOrUpdate<T>(
    collection: EntityCollection,
    whereClause: FindOneOptions<T> = {},
    params: DeepPartial<T>,
  ): Promise<T> {
    const firstEntity = await this.findOne(collection, whereClause);

    return firstEntity
      ? this.updateOne(collection, whereClause, params)
      : this.create(collection, params);
  }

  async findOne<T>(
    collection: EntityCollection,
    whereClause: FindOneOptions<T> = {},
  ): Promise<T> {
    return await this.getRepository(collection).findOne(whereClause);
  }

  async updateOne<T>(
    collection: EntityCollection,
    whereClause: FindOneOptions<T> = {},
    params: DeepPartial<T>,
  ): Promise<T | null> {
    const updated = await this.update(collection, whereClause, params);
    return updated ? updated.pop() : null;
  }

  async find<T>(
    collection: EntityCollection,
    whereClause: FindOneOptions<T> | FindManyOptions<T> = {},
  ): Promise<T[]> {
    const repo = this.getRepository(collection);

    return await repo.find(whereClause);
  }

  async update<T>(
    collection: EntityCollection,
    whereClause: FindOneOptions<T> | FindManyOptions<T> = {},
    params: DeepPartial<T>,
  ): Promise<T[] | null> {
    const entities = await this.find(collection, whereClause);
    return entities.length
      ? await this.getRepository(collection).save(
          entities.map((entity) => ({ ...entity, ...params })),
        )
      : null;
  }

  async create<T>(
    collection: EntityCollection,
    params: DeepPartial<T>,
  ): Promise<T> {
    const _repo = this.getRepository(collection);
    return _repo.save(_repo.create(params));
  }

  async softDelete<T>(
    collection: EntityCollection,
    whereClause: FindOneOptions<T> | FindManyOptions<T> = {},
  ): Promise<UpdateResult> {
    return this.getRepository(collection).softDelete(whereClause);
  }

  async count<T>(
    collection: EntityCollection,
    whereClause: FindOneOptions<T> | FindManyOptions<T> = {},
  ): Promise<number> {
    return this.getRepository(collection).count(whereClause);
  }

  createQueryBuilder(
    collection: EntityCollection,
    alias: string,
  ): SelectQueryBuilder<any> {
    const repo = this.getRepository(collection);
    return repo.createQueryBuilder(alias);
  }

  async exists<T>(
    collection: EntityCollection,
    whereClause: FindOneOptions<T> = {},
  ): Promise<boolean> {
    return this.getRepository(collection).exists(whereClause);
  }
}