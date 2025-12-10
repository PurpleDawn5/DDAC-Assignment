import { api } from './axiosClient';

export interface AgentPartnerDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  status?: 'Accepted' | 'Pending'; 
}

export interface RespondDto {
  accept: boolean;
}

export const PartnerAPI = {
  // GET: /api/Agent/partners
  getMyPartners: async () => {
    const response = await api.get<AgentPartnerDto[]>('/api/Agent/partners');
    return response.data;
  },

  // GET: /api/Agent/partners/pending
  getPendingRequests: async () => {
    const response = await api.get<AgentPartnerDto[]>('/api/Agent/partners/pending');
    return response.data;
  },

  getAvailableAgents: async () => {
    const response = await api.get<AgentPartnerDto[]>('/api/Agent/available');
    return response.data;
  },

  // PUT: /api/Agent/partners/respond/{senderId}
  respondToRequest: async (senderId: string, accept: boolean) => {
    // The backend expects a body with { accept: true/false }
    const response = await api.put(`/api/Agent/partners/respond/${senderId}`, { accept });
    return response.data;
  },

  // DELETE: /api/Agent/partners/remove/{targetId}
  removePartner: async (targetId: string) => {
    const response = await api.delete(`/api/Agent/partners/remove/${targetId}`);
    return response.data;
  },

  // POST: /api/Agent/partners/send/{targetId}
  sendRequest: async (targetId: string) => {
    const response = await api.post(`/api/Agent/partners/send/${targetId}`);
    return response.data;
  }
};