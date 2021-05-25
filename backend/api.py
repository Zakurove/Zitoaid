from .models import Set, Cluster
from django.shortcuts import render
from rest_framework import viewsets, permissions, renderers
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import SetSerializer, ClusterSerializer
from rest_framework.permissions import IsAdminUser, SAFE_METHODS


# Permissions
class IsAdminUserOrReadOnly(IsAdminUser):
    def has_permission(self, request, view):
        is_instructors = super(
            IsAdminUserOrReadOnly,
            self).has_permission(request, view)
        # Python3: is_admin = super().has_permission(request, view)
        return request.method in SAFE_METHODS or is_instructors

# If the user is in the Instructors group, they will be able to do add sets
class IsInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='instructors'):
            return True
        return request.method in SAFE_METHODS

# Only the owner of the set will be able to change its contents
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user



# Cluster
class ClusterViewSet(viewsets.ModelViewSet):
    queryset = Cluster.objects.all()
    # permission_classes = [
    #     IsInstructor,
    #     IsOwnerOrReadOnly
    # ]
    parser_classes = (MultiPartParser, )
    serializer_class = ClusterSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Set
class SetViewSet(viewsets.ModelViewSet):
    queryset = Set.objects.all()
    # permission_classes = [
    #     # permissions.IsAuthenticated,
    #     # IsAdminUserOrReadOnly
    #     IsInstructor,
    #     IsOwnerOrReadOnly
    # ]
    parser_classes = (MultiPartParser, )
    serializer_class = SetSerializer
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

