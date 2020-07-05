from rest_framework import routers
from .api import MicroViewSet

router = routers.DefaultRouter()
router.register('api/leads', MicroViewSet, 'leads')

urlpatterns = router.urls
