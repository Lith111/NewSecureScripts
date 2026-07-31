from django.urls import path
from .views import ProgressSummaryView

urlpatterns = [
    path('progress/summary/', ProgressSummaryView.as_view(), name='progress-summary'),
]