from django.contrib import admin
from .models import Progress

@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'status', 'completed_at')
    list_filter = ('status', 'lesson')
    search_fields = ('user__username', 'lesson__title')
    autocomplete_fields = ['user', 'lesson']