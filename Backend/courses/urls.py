from django.urls import path
from .views import LessonListView, LessonDetailView

urlpatterns = [
    path('lessons/', LessonListView.as_view(), name='lesson-list'),
    path('lessons/<int:order>/', LessonDetailView.as_view(), name='lesson-detail'),
]
