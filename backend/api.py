from .models import RespMicro, RespPatho, RespImaging, RespHisto, RespCyto, RespClinical,CardioMicro, CardioPatho, CardioImaging, CardioHisto, CardioCyto, CardioClinical,MSKMicro, MSKPatho, MSKImaging, MSKHisto, MSKCyto, MSKClinical,HemaMicro, HemaPatho, HemaImaging, HemaHisto, HemaCyto, HemaClinical,NeuroMicro, NeuroPatho, NeuroImaging, NeuroHisto, NeuroCyto, NeuroClinical,EndoMicro, EndoPatho, EndoImaging, EndoHisto, EndoCyto, EndoClinical,GastroMicro, GastroPatho, GastroImaging, GastroHisto, GastroCyto, GastroClinical,GenitoMicro, GenitoPatho, GenitoImaging, GenitoHisto, GenitoCyto, GenitoClinical
from django.shortcuts import render
from rest_framework import viewsets, permissions, renderers
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import  RespMicroSerializer, RespPathoSerializer, RespImagingSerializer, RespHistoSerializer, RespCytoSerializer, RespClinicalSerializer,CardioMicroSerializer, CardioPathoSerializer, CardioImagingSerializer, CardioHistoSerializer, CardioCytoSerializer, CardioClinicalSerializer,MSKMicroSerializer, MSKPathoSerializer, MSKImagingSerializer, MSKHistoSerializer, MSKCytoSerializer, MSKClinicalSerializer,HemaMicroSerializer, HemaPathoSerializer, HemaImagingSerializer, HemaHistoSerializer, HemaCytoSerializer, HemaClinicalSerializer,NeuroMicroSerializer, NeuroPathoSerializer, NeuroImagingSerializer, NeuroHistoSerializer, NeuroCytoSerializer, NeuroClinicalSerializer,EndoMicroSerializer, EndoPathoSerializer, EndoImagingSerializer, EndoHistoSerializer, EndoCytoSerializer, EndoClinicalSerializer,GastroMicroSerializer, GastroPathoSerializer, GastroImagingSerializer, GastroHistoSerializer, GastroCytoSerializer, GastroClinicalSerializer,GenitoMicroSerializer, GenitoPathoSerializer, GenitoImagingSerializer, GenitoHistoSerializer, GenitoCytoSerializer, GenitoClinicalSerializer
from rest_framework.permissions import IsAdminUser, SAFE_METHODS


class IsAdminUserOrReadOnly(IsAdminUser):

    def has_permission(self, request, view):
        is_insctructors = super(
            IsAdminUserOrReadOnly, 
            self).has_permission(request, view)
        # Python3: is_admin = super().has_permission(request, view)
        return request.method in SAFE_METHODS or is_insctructors

#If the user is in the instructors group, they will be able to do add sets
class IsInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='instructors'):
            return True
        return request.method in SAFE_METHODS

#Only the owner of the set will be able to change its contents
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user

#Blocks
#-------------------------------------------------------------------------------------------------------        
#Resp

#Micro
class RespMicroViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = RespMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = RespMicroSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Patho
class RespPathoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = RespPatho.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = RespPathoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
#Imaging
class RespImagingViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = RespImaging.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = RespImagingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Histo
class RespHistoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = RespHisto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = RespHistoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Cyto
class RespCytoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = RespCyto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = RespCytoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Clinical
class RespClinicalViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = RespClinical.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = RespClinicalSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Cardio

#Micro
class CardioMicroViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = CardioMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = CardioMicroSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Patho
class CardioPathoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = CardioPatho.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = CardioPathoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
#Imaging
class CardioImagingViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = CardioImaging.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = CardioImagingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Histo
class CardioHistoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = CardioHisto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = CardioHistoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Cyto
class CardioCytoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = CardioCyto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = CardioCytoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Clinical
class CardioClinicalViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = CardioClinical.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = CardioClinicalSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#MSK

#Micro
class MSKMicroViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = MSKMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = MSKMicroSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Patho
class MSKPathoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = MSKPatho.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = MSKPathoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
#Imaging
class MSKImagingViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = MSKImaging.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = MSKImagingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Histo
class MSKHistoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = MSKHisto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = MSKHistoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Cyto
class MSKCytoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = MSKCyto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = MSKCytoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Clinical
class MSKClinicalViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = MSKClinical.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = MSKClinicalSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Hema

#Micro
class HemaMicroViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = HemaMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = HemaMicroSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Patho
class HemaPathoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = HemaPatho.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = HemaPathoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
#Imaging
class HemaImagingViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = HemaImaging.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = HemaImagingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Histo
class HemaHistoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = HemaHisto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = HemaHistoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Cyto
class HemaCytoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = HemaCyto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = HemaCytoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Clinical
class HemaClinicalViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = HemaClinical.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = HemaClinicalSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Neuro

#Micro
class NeuroMicroViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = NeuroMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = NeuroMicroSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Patho
class NeuroPathoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = NeuroPatho.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = NeuroPathoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
#Imaging
class NeuroImagingViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = NeuroImaging.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = NeuroImagingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Histo
class NeuroHistoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = NeuroHisto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = NeuroHistoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Cyto
class NeuroCytoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = NeuroCyto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = NeuroCytoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Clinical
class NeuroClinicalViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = NeuroClinical.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = NeuroClinicalSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Endo

#Micro
class EndoMicroViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = EndoMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = EndoMicroSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Patho
class EndoPathoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = EndoPatho.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = EndoPathoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
#Imaging
class EndoImagingViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = EndoImaging.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = EndoImagingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Histo
class EndoHistoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = EndoHisto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = EndoHistoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Cyto
class EndoCytoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = EndoCyto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = EndoCytoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Clinical
class EndoClinicalViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = EndoClinical.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = EndoClinicalSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Gastro

#Micro
class GastroMicroViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GastroMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GastroMicroSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Patho
class GastroPathoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GastroPatho.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GastroPathoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
#Imaging
class GastroImagingViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GastroImaging.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GastroImagingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Histo
class GastroHistoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GastroHisto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GastroHistoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Cyto
class GastroCytoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GastroCyto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GastroCytoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Clinical
class GastroClinicalViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GastroClinical.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GastroClinicalSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Genito

#Micro
class GenitoMicroViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GenitoMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GenitoMicroSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Patho
class GenitoPathoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GenitoPatho.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GenitoPathoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
#Imaging
class GenitoImagingViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GenitoImaging.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GenitoImagingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Histo
class GenitoHistoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GenitoHisto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GenitoHistoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


#Cyto
class GenitoCytoViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GenitoCyto.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GenitoCytoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Clinical
class GenitoClinicalViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = GenitoClinical.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        # permissions.IsAuthenticated,
        #IsAdminUserOrReadOnly
         IsInstructor,
         IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = GenitoClinicalSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
