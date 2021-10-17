from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import SetViewSet, ClusterViewSet, PracticeDescInputViewSet, PracticeDescSessionViewSet
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()

#Set
router.register('api/sets', SetViewSet, 'set')
router.register('api/clusters', ClusterViewSet, 'cluster')
router.register('api/practiceDescSessions', PracticeDescSessionViewSet, 'practiceDescSession')
router.register('api/practiceDescInputs', PracticeDescInputViewSet, 'practiceDescInput')
urlpatterns = [
    path('', include(router.urls)),
] 
urlpatterns += static( settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
