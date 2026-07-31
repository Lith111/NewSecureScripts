import nested_admin
from .models import Quiz, Question, Choice

class ChoiceInline(nested_admin.NestedTabularInline):
    model = Choice
    extra = 4
    fields = ('text', 'is_correct')

class QuestionInline(nested_admin.NestedStackedInline):
    model = Question
    extra = 1
    inlines = [ChoiceInline]
    fields = ('text', 'order')

class QuizInline(nested_admin.NestedStackedInline):
    model = Quiz
    inlines = [QuestionInline]
    extra = 0          # لا نظهر سطراً فارغاً للفحص (سيُنشأ تلقائياً)
    max_num = 1
    can_delete = False
    fields = ('passing_score',)
