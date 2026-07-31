import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProgress } from '../../services/progressService';
import { fetchLessons, fetchLessonById, submitQuizAnswer, GetQuiz } from '../../services/lessonsService';

export const loadProgress = createAsyncThunk('progress/load', async () => {
  const data = await fetchUserProgress();
  return data;
});

export const loadLessonsList = createAsyncThunk('progress/loadLessonsList', async () => {
  const data = await fetchLessons();
  return data;
});

export const fetchSingleLesson = createAsyncThunk('progress/fetchSingleLesson', async (id) => {
  const data = await fetchLessonById(id);
  return data;
});
export const fetchQuiz = createAsyncThunk('progress/fetchQuiz', async (id) => {
  const data = await GetQuiz(id);
  return data;
});
export const submitQuiz = createAsyncThunk('progress/submitQuiz', async ({ lessonId, answers }, { rejectWithValue }) => {
  try {
    const data = await submitQuizAnswer(lessonId, answers);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'فشل تقديم الإجابة');
  }
});

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    enrolledLessons: [],        // [{ id, title, order, status }]
    currentLesson: null,       // تفاصيل الدرس المفتوح حاليًا
    currentQuiz:null,
    quizResult: null,          // { success, message, nextLessonId }
    isLessonLoading: false,
    isQuizLoading:false,
    isSubmitting: false,
    error: null,
  },
  reducers: {
    clearQuizResult: (state) => { state.quizResult = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLessonsList.fulfilled, (state, action) => {
        state.enrolledLessons = action.payload; // يفترض أن payload مصفوفة دروس مع status
      })
      .addCase(fetchSingleLesson.pending, (state) => {
        state.isLessonLoading = true;
        state.currentLesson = null;
        state.error = null;
      })
      .addCase(fetchSingleLesson.fulfilled, (state, action) => {
        state.isLessonLoading = false;
        state.currentLesson = action.payload;
      })
      .addCase(fetchSingleLesson.rejected, (state, action) => {
        state.isLessonLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchQuiz.pending, (state) => {
        state.isQuizLoading = true;
        state.currentQuiz = null;
        state.error = null;
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.isQuizLoading = false;
        state.currentQuiz = action.payload;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.isQuizLoading = false;
        state.error = action.error.message;
      })
      .addCase(submitQuiz.pending, (state) => {
        state.isSubmitting = true;
        state.quizResult = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.quizResult = action.payload; // { success, nextLessonId }
        if (action.payload.success && state.currentLesson) {
          // تحديث حالة الدرس الحالي إلى مكتمل
          const lesson = state.enrolledLessons.find(l => l.id === state.currentLesson.id);
          if (lesson) lesson.status = 'COMPLETED';
          // جعل الدرس التالي نشطًا
          const next = state.enrolledLessons.find(l => l.status === 'LOCKED');
          if (next) next.status = 'ACTIVE';
        }
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.isSubmitting = false;
        state.quizResult = { success: false, message: action.payload };
      });
  },
});

export const { clearQuizResult } = progressSlice.actions;
export default progressSlice.reducer;