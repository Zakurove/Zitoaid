from rest_framework import serializers
from .models import RespMicro, RespMicroImage, RespMicroNotes, RespPatho, RespPathoImage, RespPathoNotes, RespImaging, RespImagingImage, RespImagingNotes, RespHisto, RespHistoImage, RespHistoNotes, RespCyto, RespCytoImage, RespCytoNotes, RespClinical, RespClinicalImage, RespClinicalNotes
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


#Patho
class RespPathoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespPathoNotes
        fields = ('id','noteContent','x','y')

class RespPathoImageSerializer(serializers.ModelSerializer):
    notes = RespPathoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = RespPathoImage
        fields = ('id','image','notes')

class RespPathoSerializer(serializers.ModelSerializer):

    images = RespPathoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = RespPatho
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        respPatho = RespPatho.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            RespPathoImage.objects.create(respPatho=respPatho, image=img)

        #RETURN
        return respPatho

    def update(self, instance, validated_data):
        #SET 
        respPatho = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = RespPathoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                RespPathoImage.objects.create(respPatho=respPatho, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('respPathoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             RespPathoNotes.objects.update_or_create(respPathoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = RespPathoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = RespPathoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Imaging
class RespImagingNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespImagingNotes
        fields = ('id','noteContent','x','y')

class RespImagingImageSerializer(serializers.ModelSerializer):
    notes = RespImagingNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = RespImagingImage
        fields = ('id','image','notes')

class RespImagingSerializer(serializers.ModelSerializer):

    images = RespImagingImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = RespImaging
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        respImaging = RespImaging.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            RespImagingImage.objects.create(respImaging=respImaging, image=img)

        #RETURN
        return respImaging

    def update(self, instance, validated_data):
        #SET 
        respImaging = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = RespImagingImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                RespImagingImage.objects.create(respImaging=respImaging, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('respImagingImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             RespImagingNotes.objects.update_or_create(respImagingImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = RespImagingNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = RespImagingNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Histo
class RespHistoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespHistoNotes
        fields = ('id','noteContent','x','y')

class RespHistoImageSerializer(serializers.ModelSerializer):
    notes = RespHistoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = RespHistoImage
        fields = ('id','image','notes')

class RespHistoSerializer(serializers.ModelSerializer):

    images = RespHistoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = RespHisto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        respHisto = RespHisto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            RespHistoImage.objects.create(respHisto=respHisto, image=img)

        #RETURN
        return respHisto

    def update(self, instance, validated_data):
        #SET 
        respHisto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = RespHistoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                RespHistoImage.objects.create(respHisto=respHisto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('respHistoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             RespHistoNotes.objects.update_or_create(respHistoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = RespHistoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = RespHistoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Cyto
class RespCytoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespCytoNotes
        fields = ('id','noteContent','x','y')

class RespCytoImageSerializer(serializers.ModelSerializer):
    notes = RespCytoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = RespCytoImage
        fields = ('id','image','notes')

class RespCytoSerializer(serializers.ModelSerializer):

    images = RespCytoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = RespCyto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        respCyto = RespCyto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            RespCytoImage.objects.create(respCyto=respCyto, image=img)

        #RETURN
        return respCyto

    def update(self, instance, validated_data):
        #SET 
        respCyto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = RespCytoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                RespCytoImage.objects.create(respCyto=respCyto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('respCytoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             RespCytoNotes.objects.update_or_create(respCytoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = RespCytoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = RespCytoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Clinical
class RespClinicalNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespClinicalNotes
        fields = ('id','noteContent','x','y')

class RespClinicalImageSerializer(serializers.ModelSerializer):
    notes = RespClinicalNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = RespClinicalImage
        fields = ('id','image','notes')

class RespClinicalSerializer(serializers.ModelSerializer):

    images = RespClinicalImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = RespClinical
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        respClinical = RespClinical.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            RespClinicalImage.objects.create(respClinical=respClinical, image=img)

        #RETURN
        return respClinical

    def update(self, instance, validated_data):
        #SET 
        respClinical = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = RespClinicalImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                RespClinicalImage.objects.create(respClinical=respClinical, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('respClinicalImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             RespClinicalNotes.objects.update_or_create(respClinicalImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = RespClinicalNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = RespClinicalNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance