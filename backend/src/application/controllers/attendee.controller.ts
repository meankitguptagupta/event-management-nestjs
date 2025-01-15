import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttendeeEntity } from 'src/database/entities/attendee.entity';
import { AttendeeService } from '../services/attendee.service';
import { UpsertAttendeeDto } from '../dto/attendee.dto';
import { AuthGuard } from '@nestjs/passport'; // Assuming you have AuthGuard implemented
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utility/decorators/roles.decorator';
import { UserRole } from 'src/utility/enum/role';

@Controller('attendees')
@ApiTags('Attendees')  // Adding Swagger Tag to group this controller in Swagger UI
@ApiBearerAuth() // Add Bearer token in Swagger UI
@UseGuards(JwtAuthGuard, RoleGuard) // Use both JwtAuthGuard and RoleGuard
@Roles(UserRole.MANAGER) // Allow MANAGER roles
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Post('upsert')
  @UseGuards(AuthGuard('jwt'))  // Protecting this route with AuthGuard (JWT)
  @ApiResponse({
    status: 201,
    description: 'Attendee created or updated successfully',
    type: AttendeeEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict: The attendee already exists',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Token missing or invalid',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid data format',
  })
  async upsertAttendee(
    @Body() upsertAttendeeDto: UpsertAttendeeDto,
  ): Promise<AttendeeEntity> {
    return this.attendeeService.upsertAttendee(upsertAttendeeDto);
  }
}
