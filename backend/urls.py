from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import RespMicroViewSet, RespPathoViewSet, RespImagingViewSet, RespHistoViewSet, RespCytoViewSet, RespClinicalViewSet,CardioMicroViewSet, CardioPathoViewSet, CardioImagingViewSet, CardioHistoViewSet, CardioCytoViewSet, CardioClinicalViewSet,MSKMicroViewSet, MSKPathoViewSet, MSKImagingViewSet, MSKHistoViewSet, MSKCytoViewSet, MSKClinicalViewSet,HemaMicroViewSet, HemaPathoViewSet, HemaImagingViewSet, HemaHistoViewSet, HemaCytoViewSet, HemaClinicalViewSet,NeuroMicroViewSet, NeuroPathoViewSet, NeuroImagingViewSet, NeuroHistoViewSet, NeuroCytoViewSet, NeuroClinicalViewSet,EndoMicroViewSet, EndoPathoViewSet, EndoImagingViewSet, EndoHistoViewSet, EndoCytoViewSet, EndoClinicalViewSet,GastroMicroViewSet, GastroPathoViewSet, GastroImagingViewSet, GastroHistoViewSet, GastroCytoViewSet, GastroClinicalViewSet,GenitoMicroViewSet, GenitoPathoViewSet, GenitoImagingViewSet, GenitoHistoViewSet, GenitoCytoViewSet, GenitoClinicalViewSet
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
# router.register('api/leads', LeadViewSet, 'leads')
#resp
router.register('api/resp/micro', RespMicroViewSet, 'respMicro')
router.register('api/resp/patho', RespPathoViewSet, 'respPatho')
router.register('api/resp/imaging', RespImagingViewSet, 'respImaging')
router.register('api/resp/histo', RespHistoViewSet, 'respHisto')
router.register('api/resp/cyto', RespCytoViewSet, 'respCyto')
router.register('api/resp/clinical', RespClinicalViewSet, 'respClinical')
#cardio
router.register('api/cardio/micro', CardioMicroViewSet, 'cardioMicro')
router.register('api/cardio/patho', CardioPathoViewSet, 'cardioPatho')
router.register('api/cardio/imaging', CardioImagingViewSet, 'cardioImaging')
router.register('api/cardio/histo', CardioHistoViewSet, 'cardioHisto')
router.register('api/cardio/cyto', CardioCytoViewSet, 'cardioCyto')
router.register('api/cardio/clinical', CardioClinicalViewSet, 'cardioClinical')
#msk
router.register('api/msk/micro', MSKMicroViewSet, 'mskMicro')
router.register('api/msk/patho', MSKPathoViewSet, 'mskPatho')
router.register('api/msk/imaging', MSKImagingViewSet, 'mskImaging')
router.register('api/msk/histo', MSKHistoViewSet, 'mskHisto')
router.register('api/msk/cyto', MSKCytoViewSet, 'mskCyto')
router.register('api/msk/clinical', MSKClinicalViewSet, 'mskClinical')
#hema
router.register('api/hema/micro', HemaMicroViewSet, 'hemaMicro')
router.register('api/hema/patho', HemaPathoViewSet, 'hemaPatho')
router.register('api/hema/imaging', HemaImagingViewSet, 'hemaImaging')
router.register('api/hema/histo', HemaHistoViewSet, 'hemaHisto')
router.register('api/hema/cyto', HemaCytoViewSet, 'hemaCyto')
router.register('api/hema/clinical', HemaClinicalViewSet, 'hemaClinical')
#neuro
router.register('api/neuro/micro', NeuroMicroViewSet, 'neuroMicro')
router.register('api/neuro/patho', NeuroPathoViewSet, 'neuroPatho')
router.register('api/neuro/imaging', NeuroImagingViewSet, 'neuroImaging')
router.register('api/neuro/histo', NeuroHistoViewSet, 'neuroHisto')
router.register('api/neuro/cyto', NeuroCytoViewSet, 'neuroCyto')
router.register('api/neuro/clinical', NeuroClinicalViewSet, 'neuroClinical')
#endo
router.register('api/endo/micro', EndoMicroViewSet, 'endoMicro')
router.register('api/endo/patho', EndoPathoViewSet, 'endoPatho')
router.register('api/endo/imaging', EndoImagingViewSet, 'endoImaging')
router.register('api/endo/histo', EndoHistoViewSet, 'endoHisto')
router.register('api/endo/cyto', EndoCytoViewSet, 'endoCyto')
router.register('api/endo/clinical', EndoClinicalViewSet, 'endoClinical')
#gastro
router.register('api/gastro/micro', GastroMicroViewSet, 'gastroMicro')
router.register('api/gastro/patho', GastroPathoViewSet, 'gastroPatho')
router.register('api/gastro/imaging', GastroImagingViewSet, 'gastroImaging')
router.register('api/gastro/histo', GastroHistoViewSet, 'gastroHisto')
router.register('api/gastro/cyto', GastroCytoViewSet, 'gastroCyto')
router.register('api/gastro/clinical', GastroClinicalViewSet, 'gastroClinical')
#genito
router.register('api/genito/micro', GenitoMicroViewSet, 'genitoMicro')
router.register('api/genito/patho', GenitoPathoViewSet, 'genitoPatho')
router.register('api/genito/imaging', GenitoImagingViewSet, 'genitoImaging')
router.register('api/genito/histo', GenitoHistoViewSet, 'genitoHisto')
router.register('api/genito/cyto', GenitoCytoViewSet, 'genitoCyto')
router.register('api/genito/clinical', GenitoClinicalViewSet, 'genitoClinical')


urlpatterns = [
    path('', include(router.urls)),
] 
urlpatterns += static( settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
