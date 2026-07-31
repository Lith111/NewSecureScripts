from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from .models import Lesson
from progress.models import Progress
from .serializers import LessonListSerializer, LessonDetailSerializer

class LessonListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LessonListSerializer

    def get_queryset(self):
        user = self.request.user
        # الحصول على جميع الدروس المنشورة مرتبة
        lessons = Lesson.objects.filter(is_published=True).order_by('order')

        # إنشاء سجلات Progress إذا لم تكن موجودة
        for lesson in lessons:
            Progress.objects.get_or_create(
                user=user,
                lesson=lesson,
                defaults={
                    'status': 'active' if lesson.order == 1 else 'locked'
                }
            )

        # إعادة الدروس لتسلسلها
        return lessons

class LessonDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LessonDetailSerializer
    lookup_field = 'order'

    def get_queryset(self):
        return Lesson.objects.filter(is_published=True)

    def get_object(self):
        lesson = super().get_object()
        user = self.request.user

        # التحقق من صلاحية الوصول
        try:
            progress = Progress.objects.get(user=user, lesson=lesson)
        except Progress.DoesNotExist:
            raise PermissionDenied("يجب إكمال الدروس السابقة أولاً")

        if progress.status == 'locked':
            raise PermissionDenied("يجب إكمال الدرس السابق أولاً")

        return lesson