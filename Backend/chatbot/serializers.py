from rest_framework import serializers
from .models import ChatSession, Message

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source='role')      # user / bot
    text = serializers.CharField(source='content')     # محتوى الرسالة

    class Meta:
        model = Message
        fields = ['sender', 'text']                     # فقط الحقول المطلوبة للواجهة
        read_only_fields = ['sender', 'text']

class ChatSessionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatSession
        fields = ['id', 'title', 'created_at']          # لا حاجة لـ updated_at و last_message هنا

class ChatSessionDetailSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = ['id', 'title', 'messages']