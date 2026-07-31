from django.urls import path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from .admin import CustomAdminSite
admin.site.index_template = 'admin/custom_index.html'

urlpatterns = [
    path('secure-panel/', admin.site.urls),          
    path('api/auth/', include('accounts.urls')),
    path('api/', include('courses.urls')),
    path('api/', include('quizzes.urls')),
    path('api/', include('progress.urls')),
     path('api/', include('chatbot.urls')),
    # path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)