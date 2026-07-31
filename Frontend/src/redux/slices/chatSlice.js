import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createChatSession,
  fetchSessionMessages,
  sendMessage,
} from '../../services/chatService';

// إنشاء جلسة جديدة (تُستدعى عند فتح الشات لأول مرة)
export const initChatSession = createAsyncThunk('chat/initSession', async () => {
  const session = await createChatSession();
  return session;
});

// جلب رسائل جلسة معينة
export const loadSessionMessages = createAsyncThunk('chat/loadMessages', async (sessionId) => {
  const session = await fetchSessionMessages(sessionId);
  return session;
});

// إرسال رسالة
export const postMessage = createAsyncThunk(
  'chat/postMessage',
  async ({ sessionId, message }, { rejectWithValue }) => {
    try {
      const data = await sendMessage(sessionId, message);
      return data; // يفترض أنه يحتوي على reply
    } catch (err) {
      return rejectWithValue('عذراً، حدث خطأ في الاتصال بالمساعد.');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    activeSessionId: null,
    messages: [],
    isLoading: false,
    isCreatingSession: false,
  },
  reducers: {
    addUserMessageLocally: (state, action) => {
      state.messages.push({ sender: 'user', text: action.payload });
    },
    resetChat: (state) => {
      state.activeSessionId = null;
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // إنشاء الجلسة
      .addCase(initChatSession.pending, (state) => {
        state.isCreatingSession = true;
      })
      .addCase(initChatSession.fulfilled, (state, action) => {
        state.isCreatingSession = false;
        state.activeSessionId = action.payload.id;
        state.messages = [
          { sender: 'bot', text: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك؟' },
        ];
      })
      .addCase(initChatSession.rejected, (state) => {
        state.isCreatingSession = false;
        state.messages.push({
          sender: 'bot',
          text: 'فشل إنشاء جلسة المحادثة.',
          isError: true,
        });
      })
      // جلب الرسائل (لجلسة سابقة)
      .addCase(loadSessionMessages.fulfilled, (state, action) => {
        state.activeSessionId = action.payload.id;
        // إذا كانت الرسائل فارغة نضيف الترحيب
        state.messages = action.payload.messages.length
          ? action.payload.messages
          : [{ sender: 'bot', text: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك؟' }];
      })
      // إرسال رسالة
      .addCase(postMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        // نتوقع أن الـAPI يرجع كائن الرسالة أو نص الرد
        const reply = action.payload.reply || action.payload.message?.text;
        if (reply) {
          state.messages.push({ sender: 'bot', text: reply });
        }
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.messages.push({
          sender: 'bot',
          text: action.payload || 'حدث خطأ ما',
          isError: true,
        });
      });
  },
});

export const { addUserMessageLocally, resetChat } = chatSlice.actions;
export default chatSlice.reducer;