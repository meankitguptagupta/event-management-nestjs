// src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
    email: string;
    sub: string;  // User ID
    role: string; // User role (manager/employee)
  }
  