from django.contrib import admin
from django import forms
from ckeditor.widgets import CKEditorWidget
from .models import Lesson
from quizzes.models import Quiz
from quizzes.admin import QuizInline
import nested_admin

class LessonAdminForm(forms.ModelForm):
    class Meta:
        model = Lesson
        fields = '__all__'
        widgets = {
            'theory_content': CKEditorWidget(),
        }

@admin.register(Lesson)
class LessonAdmin(nested_admin.NestedModelAdmin):  # <-- التغيير الأساسي هنا
    form = LessonAdminForm
    list_display = ['order', 'title', 'is_published', 'created_at', 'updated_at']
    list_editable = ['is_published']
    list_filter = ['is_published']
    search_fields = ['title']
    ordering = ['order']

    fieldsets = (
        ('معلومات أساسية', {
            'fields': ('title', 'order', 'image','is_published')
        }),
        ('المحتوى النظري', {
            'fields': ('theory_content',),
            'classes': ('wide',)
        }),
        ('الأكواد البرمجية', {
            'fields': ('vulnerable_code', 'secure_code'),
            'classes': ('wide',)
        }),
    )

    # نُظهر QuizInline فقط عند تعديل الدرس (وليس عند الإضافة)
    def get_inlines(self, request, obj=None):
        if obj:  # وضع التعديل
            return [QuizInline]
        return []

    def save_model(self, request, obj, form, change):
        if not obj.order:
            last = Lesson.objects.order_by('order').last()
            obj.order = (last.order + 1) if last else 1
        super().save_model(request, obj, form, change)

    # بعد حفظ الدرس، نضمن وجود فحص افتراضي
    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        lesson = form.instance
        if not hasattr(lesson, 'quiz'):
            Quiz.objects.create(lesson=lesson, passing_score=70)

    class Media:
        css = {
            'all': ('css/admin_code_style.css',)
        }
actions = ['make_published', 'make_unpublished']

def make_published(self, request, queryset):
    queryset.update(is_published=True)
    self.message_user(request, "تم نشر الدروس المحددة.")
make_published.short_description = "نشر الدروس المحددة"

def make_unpublished(self, request, queryset):
    queryset.update(is_published=False)
    self.message_user(request, "تم إلغاء نشر الدروس المحددة.")
make_unpublished.short_description = "إلغاء نشر الدروس المحددة"