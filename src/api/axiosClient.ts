import axios from 'axios';

// CHANGE THIS to your actual HTTPS port from Visual Studio (launchSettings.json)
const BASE_URL = "https://localhost:7237"; 

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR: Automatically adds the "id" header to every request
api.interceptors.request.use((config) => {
  // In the future, we will get this from LocalStorage after Login
  // FOR NOW: Hardcode a valid Agent ID from your database here to test!
  const agentId = localStorage.getItem('agentId') || '7338b47b-4d68-4824-8b01-79f12ae9f2a7';
  
  if (agentId && config.headers) {
    config.headers['id'] = agentId;
  }
  return config;
});