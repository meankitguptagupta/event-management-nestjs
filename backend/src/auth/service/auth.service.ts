// src/auth/auth.service.ts
import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from './user.service';
import { AuthResponse, CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserEntity } from 'src/database/entities';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signup(params: CreateUserDto): Promise<AuthResponse> {

        const { email } = params;

        // Check if the employee already exists with the provided email
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const user = await this.userService.create(params);

        return this.generateAccessToken(user)
    }

    async login(params: LoginUserDto): Promise<AuthResponse> {
        const { email, password } = params;

        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnprocessableEntityException('User not found!');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnprocessableEntityException('Invalid credentials');
        }

        return this.generateAccessToken(user)
    }

    private generateAccessToken(user: UserEntity): AuthResponse {
        const payload = { sub: user.id };

        return {
            name: user.name,
            email: user.email,
            role: user.role,
            accessToken: this.jwtService.sign(payload)
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email); // Assume this method exists
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }
}
