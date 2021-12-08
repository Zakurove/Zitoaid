from .models import Set, Cluster, PracticeDescSession, PracticeDescInput, EmailList
from django.shortcuts import render
from rest_framework import viewsets, permissions, renderers
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import SetSerializer, ClusterSerializer, PracticeDescSessionSerializer, PracticeDescInputSerializer, EmailListSerializer
from rest_framework.permissions import IsAdminUser, SAFE_METHODS


# Permissions
class IsAdminUserOrReadOnly(IsAdminUser):
    def has_permission(self, request, view):
        is_educators = super(
            IsAdminUserOrReadOnly,
            self).has_permission(request, view)
        # Python3: is_admin = super().has_permission(request, view)
        return request.method in SAFE_METHODS or is_educators

# If the user is in the Educators group, they will be able to do add sets
class IsEducator(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='Educators'):
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
    permission_classes = [
        IsEducator,
        IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )
    serializer_class = ClusterSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Set
class SetViewSet(viewsets.ModelViewSet):
    queryset = Set.objects.all()
    permission_classes = [
        # permissions.IsAuthenticated,
        # IsAdminUserOrReadOnly
        IsEducator,
        IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )
    serializer_class = SetSerializer
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# PracticeDescSession
class PracticeDescSessionViewSet(viewsets.ModelViewSet):
    queryset = PracticeDescSession.objects.all()
    permission_classes = [
	IsOwnerOrReadOnly
    ]
    parser_classes = (MultiPartParser, )
    serializer_class = PracticeDescSessionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# PracticeDescInput
class PracticeDescInputViewSet(viewsets.ModelViewSet):
    queryset = PracticeDescInput.objects.all()
    parser_classes = (MultiPartParser, )
    serializer_class = PracticeDescInputSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# EmailList
class EmailListViewSet(viewsets.ModelViewSet):
    queryset = EmailList.objects.all()
    parser_classes = (MultiPartParser, )
    serializer_class = EmailListSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)