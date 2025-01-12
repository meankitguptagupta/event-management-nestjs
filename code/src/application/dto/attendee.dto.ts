import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpsertAttendeeDto {
  @ApiProperty({
    description: 'The ID of the event to which the user is attending',
    example: faker.string.uuid()
  })
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({
    description: 'The ID of the user attending the event',
    example: faker.string.uuid()
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
