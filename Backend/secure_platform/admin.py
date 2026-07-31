from django.contrib import admin
from django.db.models import Count, Avg
from accounts.models import CustomUser
from courses.models import Lesson
from progress.models import Progress

class CustomAdminSite(admin.AdminSite):
    index_template = "admin/index.html"

    def index(self, request, extra_context=None):
        total_users = CustomUser.objects.count()
        total_lessons = Lesson.objects.filter(is_published=True).count()
        # متوسط نسبة الإكمال
        avg_completion = Progress.objects.filter(status='completed').values('user').annotate(
            completed=Count('id')
        ).aggregate(avg=Avg('completed'))['avg'] or 0
        total_lessons_for_avg = Lesson.objects.count()
        if total_lessons_for_avg > 0:
            average_completion = (avg_completion / total_lessons_for_avg * 100) if avg_completion else 0
        else:
            average_completion = 0

        extra_context = extra_context or {}
        extra_context.update({
            'total_users': total_users,
            'total_lessons': total_lessons,
            'average_completion': round(average_completion, 1),
        })
        return super().index(request, extra_context)