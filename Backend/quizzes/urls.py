from django.urls import path
from .views import QuizView, QuizSubmitView

urlpatterns = [
    path('lessons/<int:order>/quiz/', QuizView.as_view(), name='lesson-quiz'),
    path('lessons/<int:order>/quiz/submit/', QuizSubmitView.as_view(), name='quiz-submit'),
]