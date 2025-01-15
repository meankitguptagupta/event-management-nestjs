import { IsString, IsOptional } from 'class-validator';

export class CreateTagDto {
    @IsString()
    name: string;
}

export class UpdateTagDto {
    @IsString()
    @IsOptional()
    name?: string;
}
