from django.db.models.signals import post_save
from django.dispatch import receiver
from courses.models import Lesson
from .models import Quiz

@receiver(post_save, sender=Lesson)
def create_quiz_for_lesson(sender, instance, created, **kwargs):
    if created:
        Quiz.objects.get_or_create(lesson=instance)