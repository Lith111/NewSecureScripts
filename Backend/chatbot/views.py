import requests
from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ChatSession, Message
from .serializers import (
    ChatSessionListSerializer,
    ChatSessionDetailSerializer,
    MessageSerializer,
)

class ChatSessionListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChatSessionListSerializer

    def get_queryset(self):
        return ChatSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ChatSessionDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChatSessionDetailSerializer

    def get_queryset(self):
        return ChatSession.objects.filter(user=self.request.user)

class SendMessageView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, session_id):
        try:
            session = ChatSession.objects.get(id=session_id, user=request.user)
        except ChatSession.DoesNotExist:
            return Response({"error": "الجلسة غير موجودة"}, status=status.HTTP_404_NOT_FOUND)

        user_message = request.data.get('message', '')
        if not user_message:
            return Response({"error": "الرسالة فارغة"}, status=status.HTTP_400_BAD_REQUEST)

        # حفظ رسالة المستخدم
        Message.objects.create(session=session, role='user', content=user_message)

        # الحصول على رد من OpenRouter (أو احتياطي)
        bot_reply = self.get_openrouter_response(session, user_message)
        if bot_reply is None:
            bot_reply = "عذراً، حدث خطأ أثناء معالجة طلبك. حاول مرة أخرى."

        # حفظ رد البوت
        Message.objects.create(session=session, role='bot', content=bot_reply)

        # إعادة الرد بالتنسيق المتوقع من الواجهة الأمامية
        return Response({'reply': bot_reply}, status=status.HTTP_201_CREATED)

    def get_openrouter_response(self, session, user_message):
        api_key = settings.OPENROUTER_API_KEY
        if not api_key:
            return "لم يتم تكوين مفتاح OpenRouter بعد. الرجاء إعداد OPENROUTER_API_KEY."

        # بناء السياق من آخر 10 رسائل
        previous_messages = session.messages.all()[:10]
        messages = [{
            "role": "system",
            "content": "أنت مساعد متخصص في الأمن السيبراني..."
        }]
        for msg in previous_messages:
            messages.append({"role": msg.role, "content": msg.content})
        messages.append({"role": "user", "content": user_message})

        try:
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "google/gemma-4-26b-a4b-it:free",
                    "messages": messages,
                    "temperature": 0.7,
                },
                timeout=30,
            )
            if response.status_code == 200:
                data = response.json()
                return data['choices'][0]['message']['content']
            else:
                return "عذراً، حدث خطأ في الاتصال بخدمة الذكاء الاصطناعي."
        except requests.exceptions.RequestException:
            return "عذراً، تعذر الاتصال بالخدمة حالياً."