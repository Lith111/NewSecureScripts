from rest_framework import serializers

class ProgressSummarySerializer(serializers.Serializer):
    completed_lessons = serializers.IntegerField()
    total_lessons = serializers.IntegerField()
    completion_percentage = serializers.FloatField()
    active_lesson_order = serializers.IntegerField(allow_null=True)
    streak_days = serializers.IntegerField(default=0)  # اختياري