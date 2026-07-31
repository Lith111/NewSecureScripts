from django.urls import path
from .views import ChatSessionListView, ChatSessionDetailView, SendMessageView

urlpatterns = [
    path('sessions/', ChatSessionListView.as_view(), name='chat-sessions'),
    path('sessions/<int:session_id>/', ChatSessionDetailView.as_view(), name='chat-session-detail'),
    path('sessions/<int:session_id>/send/', SendMessageView.as_view(), name='send-message'),
]