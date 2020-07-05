from rest_framework import serializers
from resp.models import Micro

# Lead Serializer
class MicroSerializer(serializers.ModelSerializer):
  class Meta:
    model = Micro
    fields = '__all__'
