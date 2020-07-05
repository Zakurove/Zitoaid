from leads.models import Lead, RespMicro
from django.shortcuts import render
from rest_framework import viewsets, permissions, renderers
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import LeadSerializer, RespMicroSerializer


#Resp
class RespMicroViewSet(viewsets.ModelViewSet):
    renderer_classes = [renderers.JSONRenderer]
    queryset = RespMicro.objects.all()
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = RespMicroSerializer
    parser_classes = (MultiPartParser,)
    #in case only want to get the leads of the user
    # def get_queryset(self):
    #     return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save()

#Lead viewset
class LeadViewSet(viewsets.ModelViewSet):
    # queryset = Lead.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = LeadSerializer
    #in case only want to get the leads of the user
    def pre_save(self, obj):
        obj.image = self.request.FILES.get('image')
    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
