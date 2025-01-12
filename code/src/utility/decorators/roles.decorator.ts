// src/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enum/role';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
