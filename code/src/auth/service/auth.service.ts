// src/auth/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from './user.service';
import { AuthResponse, CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserEntity } from 'src/database/entities';
import { UserRole } from 'src/utility/enum/role';

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

        return {
            email: user.email,
            role: user.role,
            accessToken: this.generateAccessToken(user)
        };
    }

    async login(params: LoginUserDto): Promise<AuthResponse> {
        const { email, password } = params;

        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return {
            email: user.email,
            role: user.role,
            accessToken: this.generateAccessToken(user)
        };
    }

    private generateAccessToken(user: UserEntity) {
        const payload = { sub: user.id };
        return this.jwtService.sign(payload);
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email); // Assume this method exists
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    // Method to add an employee under a manager
    async addEmployee(createUserDto: CreateUserDto, managerId: string): Promise<UserEntity> {
        const { email } = createUserDto;

        // Check if the employee already exists with the provided email
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Create the employee (user)
        const employee = this.userService.create({
            ...createUserDto,
            role: UserRole.EMPLOYEE,  // Ensure the role is set to 'employee'
            managerId: managerId,  // Associate the manager with this user
        });

        return employee;
    }
}
