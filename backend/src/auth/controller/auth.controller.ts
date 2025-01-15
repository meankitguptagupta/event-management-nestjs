import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { AuthResponse, CreateUserDto, LoginUserDto } from '../dto/user.dto';

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
}
