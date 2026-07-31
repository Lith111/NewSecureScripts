from django.db import models

class Lesson(models.Model):
    order = models.PositiveIntegerField(unique=True, verbose_name="الترتيب")
    title = models.CharField(max_length=200, verbose_name="العنوان")
    theory_content = models.TextField(verbose_name="الشرح النظري")
    vulnerable_code = models.TextField(verbose_name="كود الثغرة", blank=True)
    secure_code = models.TextField(verbose_name="الكود الآمن", blank=True)
    is_published = models.BooleanField(default=False, verbose_name="منشور")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإنشاء")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاريخ التحديث")
    image  = models.ImageField(upload_to='lesson/%Y/%m/', verbose_name="الصورة")
    class Meta:
        verbose_name = "درس"
        verbose_name_plural = "الدروس"
        ordering = ['order']

    def __str__(self):
        return f"{self.order} - {self.title}"