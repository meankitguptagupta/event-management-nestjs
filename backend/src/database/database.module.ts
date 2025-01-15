import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity, TagEntity, UserEntity } from './entities';
import { DatabaseService } from './database.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, EventEntity, TagEntity]),
    ],
    exports: [DatabaseService],
    providers: [DatabaseService],
})
export class DatabaseModule { }
