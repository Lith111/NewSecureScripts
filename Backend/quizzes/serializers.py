from rest_framework import serializers
from .models import Quiz, Question, Choice, UserQuizAttempt

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text']  # لا نرسل is_correct

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'order', 'choices']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'lesson', 'passing_score', 'questions']

class AnswerSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    selected_choice_id = serializers.IntegerField()

class QuizSubmissionSerializer(serializers.Serializer):
    answers = AnswerSerializer(many=True)

    def validate(self, data):
        return data