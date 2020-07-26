from rest_framework import serializers
from .models import RespMicro, RespMicroImage, RespMicroNotes
import logging
import sys
# class LeadSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = Lead 
#     fields = ('id', 'name', 'email', 'message', 'owner',)

class RespMicroNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespMicroNotes
        fields = ('content','x_dim','y_dim')

class RespMicroImageSerializer(serializers.ModelSerializer):
    notes = RespMicroNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = RespMicroImage
        fields = ('image','notes')

class RespMicroSerializer(serializers.ModelSerializer):

    images = RespMicroImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = RespMicro
        fields = ('id', 'title', 'description',  'images', 'owner_username','owner_id')
        
    def create(self, validated_data):
        creator = self.context['request'].user
        print(creator)
        images_data = self.context.get('view').request.FILES
        respMicro = RespMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner_id= self.context['request'].user, owner_username= self.context['request'].user.username )
        #Three is the genius cat that cracked the code
        Three = images_data.getlist('image')
        for genius in Three:
            print(genius)
            RespMicroImage.objects.create(respMicro=respMicro, image=genius)
        return respMicro
