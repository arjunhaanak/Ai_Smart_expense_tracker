import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  updateBudget: (budget) => api.put('/auth/budget', { budget }),
};

export const transactionAPI = {
  getTransactions: () => api.get('/transactions'),
  addTransaction: (data) => api.post('/transactions', data),
  deleteTransaction: (id) => api.delete(`/transactions/${id}`),
};

export const predictionAPI = {
  generate: () => api.post('/predict'),
  getLatest: () => api.get('/predict/latest'),
};

export default api;
