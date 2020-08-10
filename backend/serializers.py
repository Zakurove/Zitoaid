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
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        respMicro = RespMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            RespMicroImage.objects.create(respMicro=respMicro, image=img)

        #RETURN
        return respMicro

    def update(self, instance, validated_data):
        #SET 
        respMicro = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = RespMicroImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                RespMicroImage.objects.create(respMicro=respMicro, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('respMicroImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             RespMicroNotes.objects.update_or_create(respMicroImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = RespMicroNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = RespMicroNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance
