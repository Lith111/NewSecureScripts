from django.db import models
from courses.models import Lesson
from django.conf import settings

class Quiz(models.Model):
    lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE, related_name='quiz', verbose_name="الدرس")
    passing_score = models.PositiveIntegerField(default=70, verbose_name="درجة النجاح (%)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "فحص"
        verbose_name_plural = "فحوصات"

    def __str__(self):
        return f"فحص {self.lesson.title}"

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions', verbose_name="الفحص")
    text = models.TextField(verbose_name="نص السؤال")
    order = models.PositiveIntegerField(default=1, verbose_name="الترتيب")

    class Meta:
        verbose_name = "سؤال"
        verbose_name_plural = "أسئلة"
        ordering = ['order']

    def __str__(self):
        return f"سؤال {self.order} - {self.quiz.lesson.title}"

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices', verbose_name="السؤال")
    text = models.CharField(max_length=255, verbose_name="نص الاختيار")
    is_correct = models.BooleanField(default=False, verbose_name="إجابة صحيحة")

    class Meta:
        verbose_name = "خيار"
        verbose_name_plural = "خيارات"

    def __str__(self):
        return f"{self.text} ({'صحيح' if self.is_correct else 'خطأ'})"

class UserQuizAttempt(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="المستخدم")
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, verbose_name="الفحص")
    score = models.FloatField(verbose_name="النتيجة (%)")
    passed = models.BooleanField(default=False, verbose_name="ناجح")
    attempted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "محاولة مستخدم"
        verbose_name_plural = "محاولات المستخدمين"
        ordering = ['-attempted_at']

    def __str__(self):
        return f"{self.user.username} - {self.quiz.lesson.title} - {'ناجح' if self.passed else 'راسب'}"