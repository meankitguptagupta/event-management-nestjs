import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UserRole } from "src/utility/enum/role";

// src/user/dto/login-user.dto.ts
export class LoginUserDto { 
  @ApiProperty({
    description: 'The email of the user',
    example: faker.internet.email({provider: 'example.com'}),
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

// src/user/dto/create-user.dto.ts
export class CreateUserDto extends LoginUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: faker.person.fullName(),
  })
  @IsNotEmpty({ message: 'name is required' })
  name: string;
}

export class AuthResponse {
  @ApiProperty({
    description: 'The email of the user',
    example: faker.internet.email({provider: 'example.com'}),
  })
  email: string;

  @ApiProperty({
    description: 'The role of the user',
    example: faker.helpers.arrayElement(Object.values(UserRole)),
  })
  role: UserRole;

  @ApiProperty({
    description: 'JWT token',
    example: faker.lorem.paragraph(),
  })
  accessToken: string
}