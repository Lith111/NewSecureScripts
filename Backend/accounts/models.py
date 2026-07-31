from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('learner', 'متعلم'),
        ('admin', 'مشرف'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='learner')

    def save(self, *args, **kwargs):
        # إذا كان المستخدم "admin" نعطيه صلاحية دخول لوحة الإدارة
        if self.role == 'admin':
            self.is_staff = True
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

    @property
    def is_admin(self):
        return self.role == 'admin'

    @property
    def is_learner(self):
        return self.role == 'learner'