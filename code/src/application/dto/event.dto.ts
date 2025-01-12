// dto/create-event.dto.ts
import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEnum, IsDateString } from 'class-validator'; 

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    date: string;

    @IsString()
    time: string;

    @IsString()
    timezone: string;

    @IsBoolean()
    @IsOptional()
    isRecurring?: boolean;

    @IsEnum(['WEEKLY'])
    @IsOptional()
    recurrenceType?: 'WEEKLY';

    @IsOptional()
    recurrenceCount?: number;

    @IsString()
    @IsNotEmpty()
    creatorId: string; // Assuming creator is a user with ID
}

export class UpdateEventDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsDateString()
    @IsOptional()
    date?: string;

    @IsString()
    @IsOptional()
    time?: string;

    @IsString()
    @IsOptional()
    timezone?: string;

    @IsBoolean()
    @IsOptional()
    isRecurring?: boolean;

    @IsEnum(['WEEKLY'])
    @IsOptional()
    recurrenceType?: 'WEEKLY';

    @IsOptional()
    recurrenceCount?: number;
}
