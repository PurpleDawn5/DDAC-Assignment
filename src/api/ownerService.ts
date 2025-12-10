import { api } from './axiosClient';

export interface OwnerDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  createdByAgentId: string;
}

export interface CreateOwnerDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const OwnerAPI = {
  // GET: /api/Owner
  getAll: async () => {
    const response = await api.get<OwnerDto[]>('/api/Owner');
    return response.data;
  },

  // POST: /api/Owner
  create: async (data: CreateOwnerDto) => {
    const response = await api.post<OwnerDto>('/api/Owner', data);
    return response.data;
  },

  // PUT: /api/Owner/{id}
  update: async (id: string, data: Partial<CreateOwnerDto>) => {
    const response = await api.put(`/api/Owner/${id}`, data);
    return response.data;
  },

  // DELETE: /api/Owner/{id}
  delete: async (id: string) => {
    const response = await api.delete(`/api/Owner/${id}`);
    return response.data;
  }
};