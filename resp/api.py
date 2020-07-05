from resp.models import Micro
from rest_framework import viewsets, permissions
from .serializers import MicroSerializer

# Lead Viewset


class MicroViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MicroSerializer

    def get_queryset(self):
        return self.request.user.micros.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
