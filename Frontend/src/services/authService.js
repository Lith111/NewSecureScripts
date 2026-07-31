import api from './api';

export const loginUser = async (username, password) => {
  const response = await api.post('/auth/login/', { username, password });
  return response.data; // يفترض { user, token }
};

export const registerUser = async (data) => {
  const response = await api.post('/auth/register/',data);
  return response.data; //{ message }
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me/');
  return response.data; // { user }
};