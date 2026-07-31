import api from './api';

export const createChatSession = async () => {
  const response = await api.post('/sessions/');
  return response.data; // { id, title, created_at }
};

export const fetchSessionMessages = async (sessionId) => {
  const response = await api.get(`/sessions/${sessionId}/`);
  return response.data; // { id, title, messages: [...] }
};

export const sendMessage = async (sessionId, message) => {
  const response = await api.post(`/sessions/${sessionId}/send/`, { message });
  return response.data; // { message: { sender, text }, ... } or full updated session
};