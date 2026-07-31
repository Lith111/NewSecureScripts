import api from './api';

export const fetchLessons = async () => {
  const response = await api.get('/lessons/');  // للمتعلم – قائمة الدروس مع حالتها
  return response.data; // مصفوفة دروس
};

export const fetchLessonById = async (id) => {
  const response = await api.get(`/lessons/${id}/`);
  return response.data; // تفاصيل الدرس الكامل
};

export const GetQuiz = async (lessonId) => {
  const response = await api.get(`/lessons/${lessonId}/quiz/`);
  return response.data; 
};


export const submitQuizAnswer = async (lessonId, answers) => {
  const response = await api.post(`/lessons/${lessonId}/quiz/submit/`, { answers });
  return response.data; // { success, message, score, passed, next_lesson_order }
};

