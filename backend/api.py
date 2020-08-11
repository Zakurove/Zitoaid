from .models import RespMicro, RespPatho, RespImaging, RespHisto, RespCyto, RespClinical
from django.shortcuts import render
from rest_framework import viewsets, permissions, renderers
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import  RespMicroSerializer, RespPathoSerializer, RespImagingSerializer, RespHistoSerializer, RespCytoSerializer, RespClinicalSerializer
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
