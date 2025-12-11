import { api } from './axiosClient';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  licenseNumber: string;
}

export interface AuthResponse {
  message: string;
  agentId: string;
  agentName: string;
}

export const AuthAPI = {
  login: async (data: LoginDto) => {
    const response = await api.post<AuthResponse>('/api/Agent/login', data);
    return response.data;
  },

  // POST: /api/Agent/register
  register: async (data: RegisterDto) => {
    const response = await api.post('/api/Agent/register', data);
    return response.data;
  }
};