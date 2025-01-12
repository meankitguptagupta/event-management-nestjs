import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { EventService } from '../services/event.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { EventEntity } from 'src/database/entities';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utility/decorators/roles.decorator';
import { UserRole } from 'src/utility/enum/role';

@Controller('events')
@ApiTags('Events')
@ApiBearerAuth() // Add Bearer token in Swagger UI
@UseGuards(JwtAuthGuard, RoleGuard) // Use both JwtAuthGuard and RoleGuard
@Roles(UserRole.MANAGER, UserRole.EMPLOYEE) // Allow MANAGER roles
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
    type: EventEntity,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventService.createEvent(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all events' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all events.',
    type: [EventEntity],
  })
  async getAllEvents(): Promise<EventEntity[]> {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific event by ID' })
  @ApiParam({ name: 'id', description: 'ID of the event to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Returns the details of the event.',
    type: EventEntity,
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getEventById(@Param('id') id: string): Promise<EventEntity> {
    return this.eventService.getEventById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing event' })
  @ApiParam({ name: 'id', description: 'ID of the event to update' })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully updated.',
    type: EventEntity,
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventEntity> {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by ID' })
  @ApiParam({ name: 'id', description: 'ID of the event to delete' })
  @ApiResponse({ status: 204, description: 'Event successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async deleteEvent(@Param('id') id: string): Promise<void> {
    return this.eventService.deleteEvent(id);
  }
}
