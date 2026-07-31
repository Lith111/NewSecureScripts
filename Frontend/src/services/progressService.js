import api from './api';

export const fetchUserProgress = async () => {
  const response = await api.get('/user/progress');
  return response.data; // { completedLessons: [], currentLessonId, ... }
};