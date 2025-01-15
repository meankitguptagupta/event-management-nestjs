// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserService } from './service/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'events', // Make sure to store this secret securely
      signOptions: { expiresIn: process.env.JWT_EXPIRY_TIME || '24h' }, // Token expiration
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService, JwtAuthGuard],
  controllers: [AuthController, UserController],
})
export class AuthModule {}
