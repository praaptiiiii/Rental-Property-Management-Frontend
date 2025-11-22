export enum UserRole {
  CUSTOMER = 'customer',
  OWNER = 'owner'
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}