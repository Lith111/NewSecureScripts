from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models import Avg, Count
from courses.models import Lesson
from progress.models import Progress

def admin_stats(request):
    # فقط للصفحات الإدارية (المسار /secure-panel/)
    if request.path.startswith('/secure-panel/'):
        User = get_user_model()
        total_users = User.objects.count()
        total_lessons = Lesson.objects.filter(is_published=True).count()
        avg_completion = Progress.objects.filter(status='completed').values('user').annotate(
            completed=Count('id')
        ).aggregate(avg=Avg('completed'))['avg'] or 0
        total_lessons_for_avg = Lesson.objects.filter(is_published=True).count()
        average_completion = (avg_completion / total_lessons_for_avg * 100) if total_lessons_for_avg > 0 else 0

        return {
            'total_users': total_users,
            'total_lessons': total_lessons,
            'average_completion': round(average_completion, 1)
        }
    return {}