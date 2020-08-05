from rest_framework import serializers
from .models import RespMicro, RespMicroImage, RespMicroNotes
import logging
import json
import sys


class RespMicroNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespMicroNotes
        fields = ('id','noteContent','x','y')

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
        images_data = self.context.get('view').request.FILES
        respMicro = RespMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )
       
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            RespMicroImage.objects.create(respMicro=respMicro, image=img)
        return respMicro

    def update(self, instance, validated_data):
        #Must make this an object hmm
        respMicro = self
        print(self.context.get('view').request.data)
        # print(noteContent, noteX, noteY, noteImage, 'this is the note yay!')

        #SET info
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        images_data = self.context.get('view').request.FILES
        images = images_data.getlist('image')
        for img in images:
            print(img, 'got uploaded')
            RespMicroImage.objects.update_or_create(respMicro=respMicro, image=img)
        print(instance, "instance")
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('respMicroImage_id')
        RespMicroNotes.objects.update_or_create(respMicroImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        # RespMicroNotes.objects.update_or_create(noteContent=noteContent, id=noteId)
        print("Done creating the note")
        instance.save()
        return instance
