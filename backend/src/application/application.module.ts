import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EventController } from './controllers/event.controller';
import { TagController } from './controllers/tag.controller';
import { EventService } from './services/event.service';
import { TagService } from './services/tag.service';

@Module({
    imports: [DatabaseModule],
    controllers: [EventController, TagController],
    providers: [EventService, TagService]
})
export class ApplicationModule { }
