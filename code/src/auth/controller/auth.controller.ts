import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { AuthResponse, CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserEntity } from 'src/database/entities';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserRole } from 'src/utility/enum/role';
import { Roles } from 'src/utility/decorators/roles.decorator';
import { User } from 'src/utility/decorators/user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @ApiOperation({ summary: 'Sign up a new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
        type: AuthResponse
    })
    @ApiResponse({ status: 400, description: 'Validation error' })
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Log in an existing user' })
    @ApiBody({ type: LoginUserDto })
    @ApiResponse({
        status: 200,
        description: 'User successfully logged in',
        type: AuthResponse
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Post('employees')
    @ApiOperation({ summary: 'Add employee under a manager' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
      status: 201,
      description: 'Employee successfully registered',
      type: UserEntity,
    })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiBearerAuth() // Add Bearer token in Swagger UI
    @UseGuards(JwtAuthGuard, RoleGuard) // Use both JwtAuthGuard and RoleGuard
    @Roles(UserRole.MANAGER) // Allow MANAGER roles
    async addEmployee(@Body() createUserDto: CreateUserDto, @User() manager: UserEntity): Promise<UserEntity> {
      return this.authService.addEmployee(createUserDto, manager.id);
    }
}
