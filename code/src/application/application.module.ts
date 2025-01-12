import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EventController } from './controllers/event.controller';
import { TagController } from './controllers/tag.controller';
import { EventService } from './services/event.service';
import { TagService } from './services/tag.service';
import { AttendeeController } from './controllers/attendee.controller';
import { AttendeeService } from './services/attendee.service';

@Module({
    imports: [DatabaseModule],
    controllers: [EventController, TagController, AttendeeController],
    providers: [EventService, TagService, AttendeeService]
})
export class ApplicationModule { }
