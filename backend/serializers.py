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
        fields = ('noteContent','x','y','respMicroImage_id')

class RespMicroImageSerializer(serializers.ModelSerializer):
    notes = RespMicroNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = RespMicroImage
        fields = ('id','image','notes')

class RespMicroSerializer(serializers.ModelSerializer):

    images = RespMicroImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = RespMicro
        fields = ('id', 'title', 'description',  'images', 'owner_username','owner_id')
        
    def create(self, validated_data):
        creator = self.context['request'].user
        print(creator)
        images_data = self.context.get('view').request.FILES
        print("I'm the image serializer before the object gets created!!")
        respMicro = RespMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner_id= self.context['request'].user, owner_username= self.context['request'].user.username )
        print(respMicro, 'respMicro in create')
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print("I'm the image serializer!")
            print(img)
            RespMicroImage.objects.create(respMicro=respMicro, image=img)
        return respMicro

    def update(self, instance, validated_data):
        #Must make this an object hmm
        respMicro = self.instance

        images_data = self.context.get('view').request.FILES

        instance.title = validated_data['title']
        instance.description = validated_data['description']
        images = images_data.getlist('image')


        for img in images:
            print(img, 'got uploaded')
            RespMicroImage.objects.update_or_create(respMicro=respMicro, image=img)
        instance.save()
        return instance

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.context
    #     print(instance, 'hey instance')
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #     return Response(serializer.data)