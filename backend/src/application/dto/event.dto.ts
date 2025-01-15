import { faker } from '@faker-js/faker';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsOptional,
    IsEnum,
    IsISO8601,
    IsNumber,
} from 'class-validator';

export class CreateEventDto {
    @ApiProperty({
        description: 'Name/Title of the event.',
        example: faker.lorem.word()
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Event date and time in ISO format.',
        example: faker.date.anytime().toISOString()
    })
    @IsISO8601() // Ensures the timestamp is in ISO 8601 format
    eventTimestamp: string;

    @ApiProperty({
        description: 'If Event is not one time event',
        example: faker.datatype.boolean()
    })
    @IsBoolean()
    @IsOptional()
    isRecurring?: boolean;

    @ApiProperty({
        description: 'If Weekely Event?',
        example: faker.helpers.arrayElement(['WEEKLY']),
        required: false
    })
    @IsEnum(['WEEKLY'])
    @IsOptional()
    recurrenceType?: 'WEEKLY';

    @ApiProperty({
        description: 'Number of occurance count',
        example: faker.number.int(),
        required: false
    })
    @IsNumber()
    @IsOptional()
    recurrenceCount?: number;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}