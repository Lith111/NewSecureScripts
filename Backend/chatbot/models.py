from django.db import models
from django.conf import settings

class ChatSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="المستخدم")
    title = models.CharField(max_length=100, default="محادثة جديدة", verbose_name="العنوان")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإنشاء")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="آخر تحديث")

    class Meta:
        verbose_name = "جلسة محادثة"
        verbose_name_plural = "جلسات المحادثة"
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.user.username} - {self.title}"

class Message(models.Model):
    ROLE_CHOICES = (
        ('user', 'مستخدم'),
        ('bot', 'مساعد'),
    )
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages', verbose_name="الجلسة")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, verbose_name="الدور")
    content = models.TextField(verbose_name="المحتوى")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="وقت الإرسال")

    class Meta:
        verbose_name = "رسالة"
        verbose_name_plural = "الرسائل"
        ordering = ['created_at']

    def __str__(self):
        return f"{self.get_role_display()}: {self.content[:50]}"