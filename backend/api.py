from .models import RespMicro
from django.shortcuts import render
from rest_framework import viewsets, permissions, renderers
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import  RespMicroSerializer
from rest_framework.permissions import IsAdminUser, SAFE_METHODS


class IsAdminUserOrReadOnly(IsAdminUser):

    def has_permission(self, request, view):
        is_admin = super(
            IsAdminUserOrReadOnly, 
            self).has_permission(request, view)
        # Python3: is_admin = super().has_permission(request, view)
        return request.method in SAFE_METHODS or is_admin

#Resp
class RespMicroViewSet(viewsets.ModelViewSet):
    # renderer_classes = [renderers.JSONRenderer]
    queryset = RespMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        permissions.IsAuthenticated
        # IsAdminUserOrReadOnly
    ]
    parser_classes = (MultiPartParser, )

    serializer_class = RespMicroSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


