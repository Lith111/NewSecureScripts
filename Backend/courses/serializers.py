from rest_framework import serializers
from .models import Lesson
from progress.models import Progress

class LessonListSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['id', 'order', 'title', 'is_published','image' ,'status']

    def get_status(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return 'locked'
        try:
            progress = Progress.objects.get(user=user, lesson=obj)
            return progress.status
        except Progress.DoesNotExist:
            return 'locked'

class LessonDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'