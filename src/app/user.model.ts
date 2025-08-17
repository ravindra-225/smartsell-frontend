export interface User {
  name: string;
  email: string;
  password: string;
  role: string; // 'BUYER', 'SELLER', or 'ADMIN'
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}