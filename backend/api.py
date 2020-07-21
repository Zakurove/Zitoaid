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

    serializer_class = RespMicroSerializer
    # parser_classes = (MultiPartParser,)
    #in case only want to get the leads of the user
    # def get_queryset(self):
    #     return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


        
#
#Lead viewset
# class LeadViewSet(viewsets.ModelViewSet):
#     queryset = Lead.objects.all()
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]

#     serializer_class = LeadSerializer
#     #in case only want to get the leads of the user

#     # def get_queryset(self):
#     #     return self.request.user.leads.all()

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
