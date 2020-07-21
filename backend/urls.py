from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import RespMicroViewSet
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
# router.register('api/leads', LeadViewSet, 'leads')
router.register('api/resp/micro', RespMicroViewSet, 'respMicro')


urlpatterns = [
    path('', include(router.urls)),
] 
urlpatterns += static( settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
