from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import RespMicroViewSet, RespPathoViewSet, RespImagingViewSet, RespHistoViewSet, RespCytoViewSet, RespClinicalViewSet
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
# router.register('api/leads', LeadViewSet, 'leads')
router.register('api/resp/micro', RespMicroViewSet, 'respMicro')
router.register('api/resp/patho', RespPathoViewSet, 'respPatho')
router.register('api/resp/imaging', RespImagingViewSet, 'respImaging')
router.register('api/resp/histo', RespHistoViewSet, 'respHisto')
router.register('api/resp/cyto', RespCytoViewSet, 'respCyto')
router.register('api/resp/clinical', RespClinicalViewSet, 'respClinical')


urlpatterns = [
    path('', include(router.urls)),
] 
urlpatterns += static( settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
