from django.db import models
from django.conf import settings
from courses.models import Lesson

class Progress(models.Model):
    STATUS_CHOICES = (
        ('locked', 'مغلق'),
        ('active', 'نشط'),
        ('completed', 'مكتمل'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="المستخدم")
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, verbose_name="الدرس")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='locked', verbose_name="الحالة")
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name="تاريخ الإكمال")

    class Meta:
        unique_together = ('user', 'lesson')
        verbose_name = "تقدم المستخدم"
        verbose_name_plural = "تقدم المستخدمين"

    def __str__(self):
        return f"{self.user.username} - {self.lesson.title} ({self.get_status_display()})"