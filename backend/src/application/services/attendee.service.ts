import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendeeEntity } from 'src/database/entities/attendee.entity';
import { UpsertAttendeeDto } from '../dto/attendee.dto';
import { EventEntity } from 'src/database/entities/event.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { EntityCollection, entityMapping } from 'src/database/entity-mapping';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AttendeeService {
  private collectionName: EntityCollection =
    entityMapping.ATTENDEE as EntityCollection;

  private collectionNameUser: EntityCollection =
    entityMapping.USER as EntityCollection;

  constructor(
    private readonly _repo: DatabaseService
  ) { }

  async upsertAttendee(upsertAttendeeDto: UpsertAttendeeDto): Promise<AttendeeEntity> {
    const { eventId, userId } = upsertAttendeeDto;

    // Fetch the related event and user entities by their IDs
    const event = await this._repo.findOne(this.collectionName, { where: { id: eventId } });
    const user = await this._repo.findOne(this.collectionNameUser, { where: { id: userId } });

    if (!event) {
      throw new ConflictException('Event not found');
    }
 
    if (!user) {
      throw new ConflictException('User not found');
    }

    // Check if the attendee already exists for the given event and user
    return await this._repo.createOrUpdate<AttendeeEntity>(this.collectionName, {
      where: { eventId, userId },
    },
      { eventId, userId });
  }
}
