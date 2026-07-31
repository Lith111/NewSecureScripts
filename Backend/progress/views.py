from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Progress
from courses.models import Lesson
from .serializers import ProgressSummarySerializer
from datetime import date, timedelta

class ProgressSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        total = Lesson.objects.filter(is_published=True).count()
        completed = Progress.objects.filter(user=user, status='completed').count()
        percentage = (completed / total * 100) if total > 0 else 0

        active_progress = Progress.objects.filter(user=user, status='active').select_related('lesson').first()
        active_lesson_order = active_progress.lesson.order if active_progress else None

        # حساب أيام التتالي (اختياري)
        streak = 0
        today = date.today()
        # يمكن تحسينه لاحقاً باستخدام تواريخ حقيقية
        # كمثال بسيط: عدد الأيام المتتالية التي أكمل فيها المستخدم درساً
        completed_dates = Progress.objects.filter(
            user=user, status='completed', completed_at__isnull=False
        ).order_by('-completed_at').values_list('completed_at', flat=True)
        for dt in completed_dates:
            if dt.date() == today - timedelta(days=streak):
                streak += 1
            else:
                break

        serializer = ProgressSummarySerializer({
            'completed_lessons': completed,
            'total_lessons': total,
            'completion_percentage': round(percentage, 1),
            'active_lesson_order': active_lesson_order,
            'streak_days': streak,
        })
        return Response(serializer.data)