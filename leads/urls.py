from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import LeadViewSet, RespMicroViewSet



router = DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')
router.register('api/resp/micro', RespMicroViewSet, 'respMicro')
# router.register('api/resp/micro/create', RespMicroViewSet, 'respMicro')
# router.register('api/resp/micro', RespMicroViewSet, 'respMicro')

urlpatterns = [
    path('', include(router.urls)),
]
