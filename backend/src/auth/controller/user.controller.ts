import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/user.dto';
import { UserEntity } from 'src/database/entities';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserRole } from 'src/utility/enum/role';
import { Roles } from 'src/utility/decorators/roles.decorator';
import { User } from 'src/utility/decorators/user.decorator';
import { UserService } from '../service/user.service';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth() // Add Bearer token in Swagger UI
@UseGuards(JwtAuthGuard, RoleGuard) // Use both JwtAuthGuard and RoleGuard
export class UserController {
    constructor(private _service: UserService) { }

    @Post('employees')
    @ApiOperation({ summary: 'Add employee under a manager' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'Employee successfully registered',
        type: UserEntity,
    })
    @Roles(UserRole.MANAGER) // Allow MANAGER roles
    @ApiResponse({ status: 400, description: 'Validation error' })
    async addEmployee(@Body() createUserDto: CreateUserDto, @User() manager: UserEntity): Promise<UserEntity> {
        return this._service.addEmployee(createUserDto, manager.id);
    }

    @Get('employees')
    @ApiOperation({ summary: 'List employee under a manager' })
    @ApiResponse({
        status: 201,
        description: 'Employee list successfully found.',
        type: [UserEntity],
    })
    @Roles(UserRole.MANAGER) // Allow MANAGER roles
    @ApiResponse({ status: 400, description: 'Validation error' })
    async listEmployees(@User() manager: UserEntity): Promise<UserEntity[]> {
        return this._service.findEmployee(manager.id);
    }

    @Get('employees/count')
    @ApiOperation({ summary: 'Count employee under a manager' })
    @ApiResponse({
        status: 201,
        description: 'Employee count successfully found.',
        type: Promise<{ count: number }>,
    })
    @Roles(UserRole.MANAGER) // Allow MANAGER roles
    @ApiResponse({ status: 400, description: 'Validation error' })
    async countEmployee(@User() manager: UserEntity): Promise<{ count: number }> {
        return this._service.countEmployee(manager.id);
    }
}
