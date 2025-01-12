import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/utility/enum/role';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;  // If no roles are specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has one of the roles
    return roles.includes(user.role);
  }
}
