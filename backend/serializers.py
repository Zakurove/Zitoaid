from rest_framework import serializers
from .models import RespMicro, RespMicroImage, RespMicroNotes, RespPatho, RespPathoImage, RespPathoNotes, RespImaging, RespImagingImage, RespImagingNotes, RespHisto, RespHistoImage, RespHistoNotes, RespCyto, RespCytoImage, RespCytoNotes, RespClinical, RespClinicalImage, RespClinicalNotes,CardioMicro,CardioMicroImage,CardioMicroNotes,CardioPatho,CardioPathoImage,CardioPathoNotes,CardioImaging,CardioImagingImage,CardioImagingNotes,CardioHisto,CardioHistoImage,CardioHistoNotes,CardioCyto,CardioCytoImage,CardioCytoNotes,CardioClinical,CardioClinicalImage,CardioClinicalNotes,MSKMicro,MSKMicroImage,MSKMicroNotes,MSKPatho,MSKPathoImage,MSKPathoNotes,MSKImaging,MSKImagingImage,MSKImagingNotes,MSKHisto,MSKHistoImage,MSKHistoNotes,MSKCyto,MSKCytoImage,MSKCytoNotes,MSKClinical,MSKClinicalImage,MSKClinicalNotes,HemaMicro,HemaMicroImage,HemaMicroNotes,HemaPatho,HemaPathoImage,HemaPathoNotes,HemaImaging,HemaImagingImage,HemaImagingNotes,HemaHisto,HemaHistoImage,HemaHistoNotes,HemaCyto,HemaCytoImage,HemaCytoNotes,HemaClinical,HemaClinicalImage,HemaClinicalNotes,NeuroMicro,NeuroMicroImage,NeuroMicroNotes,NeuroPatho,NeuroPathoImage,NeuroPathoNotes,NeuroImaging,NeuroImagingImage,NeuroImagingNotes,NeuroHisto,NeuroHistoImage,NeuroHistoNotes,NeuroCyto,NeuroCytoImage,NeuroCytoNotes,NeuroClinical,NeuroClinicalImage,NeuroClinicalNotes,EndoMicro,EndoMicroImage,EndoMicroNotes,EndoPatho,EndoPathoImage,EndoPathoNotes,EndoImaging,EndoImagingImage,EndoImagingNotes,EndoHisto,EndoHistoImage,EndoHistoNotes,EndoCyto,EndoCytoImage,EndoCytoNotes,EndoClinical,EndoClinicalImage,EndoClinicalNotes,GastroMicro,GastroMicroImage,GastroMicroNotes,GastroPatho,GastroPathoImage,GastroPathoNotes,GastroImaging,GastroImagingImage,GastroImagingNotes,GastroHisto,GastroHistoImage,GastroHistoNotes,GastroCyto,GastroCytoImage,GastroCytoNotes,GastroClinical,GastroClinicalImage,GastroClinicalNotes,GenitoMicro,GenitoMicroImage,GenitoMicroNotes,GenitoPatho,GenitoPathoImage,GenitoPathoNotes,GenitoImaging,GenitoImagingImage,GenitoImagingNotes,GenitoHisto,GenitoHistoImage,GenitoHistoNotes,GenitoCyto,GenitoCytoImage,GenitoCytoNotes,GenitoClinical,GenitoClinicalImage,GenitoClinicalNotes
import logging
import json
import sys

#Resp
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

#Cardio
class CardioMicroNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardioMicroNotes
        fields = ('id','noteContent','x','y')

class CardioMicroImageSerializer(serializers.ModelSerializer):
    notes = CardioMicroNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = CardioMicroImage
        fields = ('id','image','notes')

class CardioMicroSerializer(serializers.ModelSerializer):

    images = CardioMicroImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = CardioMicro
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        cardioMicro = CardioMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            CardioMicroImage.objects.create(cardioMicro=cardioMicro, image=img)

        #RETURN
        return cardioMicro

    def update(self, instance, validated_data):
        #SET 
        cardioMicro = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = CardioMicroImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                CardioMicroImage.objects.create(cardioMicro=cardioMicro, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('cardioMicroImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             CardioMicroNotes.objects.update_or_create(cardioMicroImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = CardioMicroNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = CardioMicroNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance


#Patho
class CardioPathoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardioPathoNotes
        fields = ('id','noteContent','x','y')

class CardioPathoImageSerializer(serializers.ModelSerializer):
    notes = CardioPathoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = CardioPathoImage
        fields = ('id','image','notes')

class CardioPathoSerializer(serializers.ModelSerializer):

    images = CardioPathoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = CardioPatho
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        cardioPatho = CardioPatho.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            CardioPathoImage.objects.create(cardioPatho=cardioPatho, image=img)

        #RETURN
        return cardioPatho

    def update(self, instance, validated_data):
        #SET 
        cardioPatho = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = CardioPathoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                CardioPathoImage.objects.create(cardioPatho=cardioPatho, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('cardioPathoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             CardioPathoNotes.objects.update_or_create(cardioPathoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = CardioPathoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = CardioPathoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Imaging
class CardioImagingNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardioImagingNotes
        fields = ('id','noteContent','x','y')

class CardioImagingImageSerializer(serializers.ModelSerializer):
    notes = CardioImagingNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = CardioImagingImage
        fields = ('id','image','notes')

class CardioImagingSerializer(serializers.ModelSerializer):

    images = CardioImagingImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = CardioImaging
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        cardioImaging = CardioImaging.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            CardioImagingImage.objects.create(cardioImaging=cardioImaging, image=img)

        #RETURN
        return cardioImaging

    def update(self, instance, validated_data):
        #SET 
        cardioImaging = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = CardioImagingImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                CardioImagingImage.objects.create(cardioImaging=cardioImaging, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('cardioImagingImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             CardioImagingNotes.objects.update_or_create(cardioImagingImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = CardioImagingNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = CardioImagingNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Histo
class CardioHistoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardioHistoNotes
        fields = ('id','noteContent','x','y')

class CardioHistoImageSerializer(serializers.ModelSerializer):
    notes = CardioHistoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = CardioHistoImage
        fields = ('id','image','notes')

class CardioHistoSerializer(serializers.ModelSerializer):

    images = CardioHistoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = CardioHisto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        cardioHisto = CardioHisto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            CardioHistoImage.objects.create(cardioHisto=cardioHisto, image=img)

        #RETURN
        return cardioHisto

    def update(self, instance, validated_data):
        #SET 
        cardioHisto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = CardioHistoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                CardioHistoImage.objects.create(cardioHisto=cardioHisto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('cardioHistoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             CardioHistoNotes.objects.update_or_create(cardioHistoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = CardioHistoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = CardioHistoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Cyto
class CardioCytoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardioCytoNotes
        fields = ('id','noteContent','x','y')

class CardioCytoImageSerializer(serializers.ModelSerializer):
    notes = CardioCytoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = CardioCytoImage
        fields = ('id','image','notes')

class CardioCytoSerializer(serializers.ModelSerializer):

    images = CardioCytoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = CardioCyto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        cardioCyto = CardioCyto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            CardioCytoImage.objects.create(cardioCyto=cardioCyto, image=img)

        #RETURN
        return cardioCyto

    def update(self, instance, validated_data):
        #SET 
        cardioCyto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = CardioCytoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                CardioCytoImage.objects.create(cardioCyto=cardioCyto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('cardioCytoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             CardioCytoNotes.objects.update_or_create(cardioCytoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = CardioCytoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = CardioCytoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Clinical
class CardioClinicalNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardioClinicalNotes
        fields = ('id','noteContent','x','y')

class CardioClinicalImageSerializer(serializers.ModelSerializer):
    notes = CardioClinicalNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = CardioClinicalImage
        fields = ('id','image','notes')

class CardioClinicalSerializer(serializers.ModelSerializer):

    images = CardioClinicalImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = CardioClinical
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        cardioClinical = CardioClinical.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            CardioClinicalImage.objects.create(cardioClinical=cardioClinical, image=img)

        #RETURN
        return cardioClinical

    def update(self, instance, validated_data):
        #SET 
        cardioClinical = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = CardioClinicalImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                CardioClinicalImage.objects.create(cardioClinical=cardioClinical, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('cardioClinicalImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             CardioClinicalNotes.objects.update_or_create(cardioClinicalImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = CardioClinicalNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = CardioClinicalNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#MSK
class MSKMicroNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSKMicroNotes
        fields = ('id','noteContent','x','y')

class MSKMicroImageSerializer(serializers.ModelSerializer):
    notes = MSKMicroNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = MSKMicroImage
        fields = ('id','image','notes')

class MSKMicroSerializer(serializers.ModelSerializer):

    images = MSKMicroImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = MSKMicro
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        mskMicro = MSKMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            MSKMicroImage.objects.create(mskMicro=mskMicro, image=img)

        #RETURN
        return mskMicro

    def update(self, instance, validated_data):
        #SET 
        mskMicro = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = MSKMicroImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                MSKMicroImage.objects.create(mskMicro=mskMicro, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('mskMicroImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             MSKMicroNotes.objects.update_or_create(mskMicroImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = MSKMicroNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = MSKMicroNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance


#Patho
class MSKPathoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSKPathoNotes
        fields = ('id','noteContent','x','y')

class MSKPathoImageSerializer(serializers.ModelSerializer):
    notes = MSKPathoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = MSKPathoImage
        fields = ('id','image','notes')

class MSKPathoSerializer(serializers.ModelSerializer):

    images = MSKPathoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = MSKPatho
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        mskPatho = MSKPatho.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            MSKPathoImage.objects.create(mskPatho=mskPatho, image=img)

        #RETURN
        return mskPatho

    def update(self, instance, validated_data):
        #SET 
        mskPatho = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = MSKPathoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                MSKPathoImage.objects.create(mskPatho=mskPatho, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('mskPathoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             MSKPathoNotes.objects.update_or_create(mskPathoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = MSKPathoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = MSKPathoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Imaging
class MSKImagingNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSKImagingNotes
        fields = ('id','noteContent','x','y')

class MSKImagingImageSerializer(serializers.ModelSerializer):
    notes = MSKImagingNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = MSKImagingImage
        fields = ('id','image','notes')

class MSKImagingSerializer(serializers.ModelSerializer):

    images = MSKImagingImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = MSKImaging
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        mskImaging = MSKImaging.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            MSKImagingImage.objects.create(mskImaging=mskImaging, image=img)

        #RETURN
        return mskImaging

    def update(self, instance, validated_data):
        #SET 
        mskImaging = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = MSKImagingImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                MSKImagingImage.objects.create(mskImaging=mskImaging, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('mskImagingImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             MSKImagingNotes.objects.update_or_create(mskImagingImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = MSKImagingNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = MSKImagingNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Histo
class MSKHistoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSKHistoNotes
        fields = ('id','noteContent','x','y')

class MSKHistoImageSerializer(serializers.ModelSerializer):
    notes = MSKHistoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = MSKHistoImage
        fields = ('id','image','notes')

class MSKHistoSerializer(serializers.ModelSerializer):

    images = MSKHistoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = MSKHisto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        mskHisto = MSKHisto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            MSKHistoImage.objects.create(mskHisto=mskHisto, image=img)

        #RETURN
        return mskHisto

    def update(self, instance, validated_data):
        #SET 
        mskHisto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = MSKHistoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                MSKHistoImage.objects.create(mskHisto=mskHisto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('mskHistoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             MSKHistoNotes.objects.update_or_create(mskHistoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = MSKHistoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = MSKHistoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Cyto
class MSKCytoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSKCytoNotes
        fields = ('id','noteContent','x','y')

class MSKCytoImageSerializer(serializers.ModelSerializer):
    notes = MSKCytoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = MSKCytoImage
        fields = ('id','image','notes')

class MSKCytoSerializer(serializers.ModelSerializer):

    images = MSKCytoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = MSKCyto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        mskCyto = MSKCyto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            MSKCytoImage.objects.create(mskCyto=mskCyto, image=img)

        #RETURN
        return mskCyto

    def update(self, instance, validated_data):
        #SET 
        mskCyto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = MSKCytoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                MSKCytoImage.objects.create(mskCyto=mskCyto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('mskCytoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             MSKCytoNotes.objects.update_or_create(mskCytoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = MSKCytoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = MSKCytoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Clinical
class MSKClinicalNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSKClinicalNotes
        fields = ('id','noteContent','x','y')

class MSKClinicalImageSerializer(serializers.ModelSerializer):
    notes = MSKClinicalNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = MSKClinicalImage
        fields = ('id','image','notes')

class MSKClinicalSerializer(serializers.ModelSerializer):

    images = MSKClinicalImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = MSKClinical
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        mskClinical = MSKClinical.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            MSKClinicalImage.objects.create(mskClinical=mskClinical, image=img)

        #RETURN
        return mskClinical

    def update(self, instance, validated_data):
        #SET 
        mskClinical = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = MSKClinicalImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                MSKClinicalImage.objects.create(mskClinical=mskClinical, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('mskClinicalImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             MSKClinicalNotes.objects.update_or_create(mskClinicalImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = MSKClinicalNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = MSKClinicalNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Hema
class HemaMicroNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HemaMicroNotes
        fields = ('id','noteContent','x','y')

class HemaMicroImageSerializer(serializers.ModelSerializer):
    notes = HemaMicroNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = HemaMicroImage
        fields = ('id','image','notes')

class HemaMicroSerializer(serializers.ModelSerializer):

    images = HemaMicroImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = HemaMicro
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        hemaMicro = HemaMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            HemaMicroImage.objects.create(hemaMicro=hemaMicro, image=img)

        #RETURN
        return hemaMicro

    def update(self, instance, validated_data):
        #SET 
        hemaMicro = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = HemaMicroImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                HemaMicroImage.objects.create(hemaMicro=hemaMicro, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('hemaMicroImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             HemaMicroNotes.objects.update_or_create(hemaMicroImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = HemaMicroNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = HemaMicroNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance


#Patho
class HemaPathoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HemaPathoNotes
        fields = ('id','noteContent','x','y')

class HemaPathoImageSerializer(serializers.ModelSerializer):
    notes = HemaPathoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = HemaPathoImage
        fields = ('id','image','notes')

class HemaPathoSerializer(serializers.ModelSerializer):

    images = HemaPathoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = HemaPatho
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        hemaPatho = HemaPatho.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            HemaPathoImage.objects.create(hemaPatho=hemaPatho, image=img)

        #RETURN
        return hemaPatho

    def update(self, instance, validated_data):
        #SET 
        hemaPatho = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = HemaPathoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                HemaPathoImage.objects.create(hemaPatho=hemaPatho, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('hemaPathoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             HemaPathoNotes.objects.update_or_create(hemaPathoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = HemaPathoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = HemaPathoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Imaging
class HemaImagingNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HemaImagingNotes
        fields = ('id','noteContent','x','y')

class HemaImagingImageSerializer(serializers.ModelSerializer):
    notes = HemaImagingNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = HemaImagingImage
        fields = ('id','image','notes')

class HemaImagingSerializer(serializers.ModelSerializer):

    images = HemaImagingImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = HemaImaging
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        hemaImaging = HemaImaging.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            HemaImagingImage.objects.create(hemaImaging=hemaImaging, image=img)

        #RETURN
        return hemaImaging

    def update(self, instance, validated_data):
        #SET 
        hemaImaging = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = HemaImagingImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                HemaImagingImage.objects.create(hemaImaging=hemaImaging, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('hemaImagingImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             HemaImagingNotes.objects.update_or_create(hemaImagingImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = HemaImagingNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = HemaImagingNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Histo
class HemaHistoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HemaHistoNotes
        fields = ('id','noteContent','x','y')

class HemaHistoImageSerializer(serializers.ModelSerializer):
    notes = HemaHistoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = HemaHistoImage
        fields = ('id','image','notes')

class HemaHistoSerializer(serializers.ModelSerializer):

    images = HemaHistoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = HemaHisto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        hemaHisto = HemaHisto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            HemaHistoImage.objects.create(hemaHisto=hemaHisto, image=img)

        #RETURN
        return hemaHisto

    def update(self, instance, validated_data):
        #SET 
        hemaHisto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = HemaHistoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                HemaHistoImage.objects.create(hemaHisto=hemaHisto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('hemaHistoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             HemaHistoNotes.objects.update_or_create(hemaHistoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = HemaHistoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = HemaHistoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Cyto
class HemaCytoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HemaCytoNotes
        fields = ('id','noteContent','x','y')

class HemaCytoImageSerializer(serializers.ModelSerializer):
    notes = HemaCytoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = HemaCytoImage
        fields = ('id','image','notes')

class HemaCytoSerializer(serializers.ModelSerializer):

    images = HemaCytoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = HemaCyto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        hemaCyto = HemaCyto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            HemaCytoImage.objects.create(hemaCyto=hemaCyto, image=img)

        #RETURN
        return hemaCyto

    def update(self, instance, validated_data):
        #SET 
        hemaCyto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = HemaCytoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                HemaCytoImage.objects.create(hemaCyto=hemaCyto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('hemaCytoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             HemaCytoNotes.objects.update_or_create(hemaCytoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = HemaCytoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = HemaCytoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Clinical
class HemaClinicalNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HemaClinicalNotes
        fields = ('id','noteContent','x','y')

class HemaClinicalImageSerializer(serializers.ModelSerializer):
    notes = HemaClinicalNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = HemaClinicalImage
        fields = ('id','image','notes')

class HemaClinicalSerializer(serializers.ModelSerializer):

    images = HemaClinicalImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = HemaClinical
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        hemaClinical = HemaClinical.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            HemaClinicalImage.objects.create(hemaClinical=hemaClinical, image=img)

        #RETURN
        return hemaClinical

    def update(self, instance, validated_data):
        #SET 
        hemaClinical = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = HemaClinicalImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                HemaClinicalImage.objects.create(hemaClinical=hemaClinical, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('hemaClinicalImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             HemaClinicalNotes.objects.update_or_create(hemaClinicalImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = HemaClinicalNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = HemaClinicalNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Neuro
class NeuroMicroNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NeuroMicroNotes
        fields = ('id','noteContent','x','y')

class NeuroMicroImageSerializer(serializers.ModelSerializer):
    notes = NeuroMicroNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = NeuroMicroImage
        fields = ('id','image','notes')

class NeuroMicroSerializer(serializers.ModelSerializer):

    images = NeuroMicroImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = NeuroMicro
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        neuroMicro = NeuroMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            NeuroMicroImage.objects.create(neuroMicro=neuroMicro, image=img)

        #RETURN
        return neuroMicro

    def update(self, instance, validated_data):
        #SET 
        neuroMicro = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = NeuroMicroImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                NeuroMicroImage.objects.create(neuroMicro=neuroMicro, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('neuroMicroImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             NeuroMicroNotes.objects.update_or_create(neuroMicroImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = NeuroMicroNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = NeuroMicroNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance


#Patho
class NeuroPathoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NeuroPathoNotes
        fields = ('id','noteContent','x','y')

class NeuroPathoImageSerializer(serializers.ModelSerializer):
    notes = NeuroPathoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = NeuroPathoImage
        fields = ('id','image','notes')

class NeuroPathoSerializer(serializers.ModelSerializer):

    images = NeuroPathoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = NeuroPatho
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        neuroPatho = NeuroPatho.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            NeuroPathoImage.objects.create(neuroPatho=neuroPatho, image=img)

        #RETURN
        return neuroPatho

    def update(self, instance, validated_data):
        #SET 
        neuroPatho = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = NeuroPathoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                NeuroPathoImage.objects.create(neuroPatho=neuroPatho, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('neuroPathoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             NeuroPathoNotes.objects.update_or_create(neuroPathoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = NeuroPathoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = NeuroPathoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Imaging
class NeuroImagingNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NeuroImagingNotes
        fields = ('id','noteContent','x','y')

class NeuroImagingImageSerializer(serializers.ModelSerializer):
    notes = NeuroImagingNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = NeuroImagingImage
        fields = ('id','image','notes')

class NeuroImagingSerializer(serializers.ModelSerializer):

    images = NeuroImagingImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = NeuroImaging
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        neuroImaging = NeuroImaging.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            NeuroImagingImage.objects.create(neuroImaging=neuroImaging, image=img)

        #RETURN
        return neuroImaging

    def update(self, instance, validated_data):
        #SET 
        neuroImaging = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = NeuroImagingImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                NeuroImagingImage.objects.create(neuroImaging=neuroImaging, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('neuroImagingImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             NeuroImagingNotes.objects.update_or_create(neuroImagingImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = NeuroImagingNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = NeuroImagingNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Histo
class NeuroHistoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NeuroHistoNotes
        fields = ('id','noteContent','x','y')

class NeuroHistoImageSerializer(serializers.ModelSerializer):
    notes = NeuroHistoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = NeuroHistoImage
        fields = ('id','image','notes')

class NeuroHistoSerializer(serializers.ModelSerializer):

    images = NeuroHistoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = NeuroHisto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        neuroHisto = NeuroHisto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            NeuroHistoImage.objects.create(neuroHisto=neuroHisto, image=img)

        #RETURN
        return neuroHisto

    def update(self, instance, validated_data):
        #SET 
        neuroHisto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = NeuroHistoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                NeuroHistoImage.objects.create(neuroHisto=neuroHisto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('neuroHistoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             NeuroHistoNotes.objects.update_or_create(neuroHistoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = NeuroHistoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = NeuroHistoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Cyto
class NeuroCytoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NeuroCytoNotes
        fields = ('id','noteContent','x','y')

class NeuroCytoImageSerializer(serializers.ModelSerializer):
    notes = NeuroCytoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = NeuroCytoImage
        fields = ('id','image','notes')

class NeuroCytoSerializer(serializers.ModelSerializer):

    images = NeuroCytoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = NeuroCyto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        neuroCyto = NeuroCyto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            NeuroCytoImage.objects.create(neuroCyto=neuroCyto, image=img)

        #RETURN
        return neuroCyto

    def update(self, instance, validated_data):
        #SET 
        neuroCyto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = NeuroCytoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                NeuroCytoImage.objects.create(neuroCyto=neuroCyto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('neuroCytoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             NeuroCytoNotes.objects.update_or_create(neuroCytoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = NeuroCytoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = NeuroCytoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Clinical
class NeuroClinicalNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NeuroClinicalNotes
        fields = ('id','noteContent','x','y')

class NeuroClinicalImageSerializer(serializers.ModelSerializer):
    notes = NeuroClinicalNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = NeuroClinicalImage
        fields = ('id','image','notes')

class NeuroClinicalSerializer(serializers.ModelSerializer):

    images = NeuroClinicalImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = NeuroClinical
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        neuroClinical = NeuroClinical.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            NeuroClinicalImage.objects.create(neuroClinical=neuroClinical, image=img)

        #RETURN
        return neuroClinical

    def update(self, instance, validated_data):
        #SET 
        neuroClinical = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = NeuroClinicalImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                NeuroClinicalImage.objects.create(neuroClinical=neuroClinical, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('neuroClinicalImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             NeuroClinicalNotes.objects.update_or_create(neuroClinicalImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = NeuroClinicalNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = NeuroClinicalNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Endo
class EndoMicroNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndoMicroNotes
        fields = ('id','noteContent','x','y')

class EndoMicroImageSerializer(serializers.ModelSerializer):
    notes = EndoMicroNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = EndoMicroImage
        fields = ('id','image','notes')

class EndoMicroSerializer(serializers.ModelSerializer):

    images = EndoMicroImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = EndoMicro
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        endoMicro = EndoMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            EndoMicroImage.objects.create(endoMicro=endoMicro, image=img)

        #RETURN
        return endoMicro

    def update(self, instance, validated_data):
        #SET 
        endoMicro = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = EndoMicroImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                EndoMicroImage.objects.create(endoMicro=endoMicro, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('endoMicroImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             EndoMicroNotes.objects.update_or_create(endoMicroImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = EndoMicroNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = EndoMicroNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance


#Patho
class EndoPathoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndoPathoNotes
        fields = ('id','noteContent','x','y')

class EndoPathoImageSerializer(serializers.ModelSerializer):
    notes = EndoPathoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = EndoPathoImage
        fields = ('id','image','notes')

class EndoPathoSerializer(serializers.ModelSerializer):

    images = EndoPathoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = EndoPatho
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        endoPatho = EndoPatho.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            EndoPathoImage.objects.create(endoPatho=endoPatho, image=img)

        #RETURN
        return endoPatho

    def update(self, instance, validated_data):
        #SET 
        endoPatho = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = EndoPathoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                EndoPathoImage.objects.create(endoPatho=endoPatho, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('endoPathoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             EndoPathoNotes.objects.update_or_create(endoPathoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = EndoPathoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = EndoPathoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Imaging
class EndoImagingNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndoImagingNotes
        fields = ('id','noteContent','x','y')

class EndoImagingImageSerializer(serializers.ModelSerializer):
    notes = EndoImagingNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = EndoImagingImage
        fields = ('id','image','notes')

class EndoImagingSerializer(serializers.ModelSerializer):

    images = EndoImagingImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = EndoImaging
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        endoImaging = EndoImaging.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            EndoImagingImage.objects.create(endoImaging=endoImaging, image=img)

        #RETURN
        return endoImaging

    def update(self, instance, validated_data):
        #SET 
        endoImaging = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = EndoImagingImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                EndoImagingImage.objects.create(endoImaging=endoImaging, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('endoImagingImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             EndoImagingNotes.objects.update_or_create(endoImagingImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = EndoImagingNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = EndoImagingNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Histo
class EndoHistoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndoHistoNotes
        fields = ('id','noteContent','x','y')

class EndoHistoImageSerializer(serializers.ModelSerializer):
    notes = EndoHistoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = EndoHistoImage
        fields = ('id','image','notes')

class EndoHistoSerializer(serializers.ModelSerializer):

    images = EndoHistoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = EndoHisto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        endoHisto = EndoHisto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            EndoHistoImage.objects.create(endoHisto=endoHisto, image=img)

        #RETURN
        return endoHisto

    def update(self, instance, validated_data):
        #SET 
        endoHisto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = EndoHistoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                EndoHistoImage.objects.create(endoHisto=endoHisto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('endoHistoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             EndoHistoNotes.objects.update_or_create(endoHistoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = EndoHistoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = EndoHistoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Cyto
class EndoCytoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndoCytoNotes
        fields = ('id','noteContent','x','y')

class EndoCytoImageSerializer(serializers.ModelSerializer):
    notes = EndoCytoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = EndoCytoImage
        fields = ('id','image','notes')

class EndoCytoSerializer(serializers.ModelSerializer):

    images = EndoCytoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = EndoCyto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        endoCyto = EndoCyto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            EndoCytoImage.objects.create(endoCyto=endoCyto, image=img)

        #RETURN
        return endoCyto

    def update(self, instance, validated_data):
        #SET 
        endoCyto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = EndoCytoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                EndoCytoImage.objects.create(endoCyto=endoCyto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('endoCytoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             EndoCytoNotes.objects.update_or_create(endoCytoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = EndoCytoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = EndoCytoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Clinical
class EndoClinicalNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndoClinicalNotes
        fields = ('id','noteContent','x','y')

class EndoClinicalImageSerializer(serializers.ModelSerializer):
    notes = EndoClinicalNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = EndoClinicalImage
        fields = ('id','image','notes')

class EndoClinicalSerializer(serializers.ModelSerializer):

    images = EndoClinicalImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = EndoClinical
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        endoClinical = EndoClinical.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            EndoClinicalImage.objects.create(endoClinical=endoClinical, image=img)

        #RETURN
        return endoClinical

    def update(self, instance, validated_data):
        #SET 
        endoClinical = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = EndoClinicalImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                EndoClinicalImage.objects.create(endoClinical=endoClinical, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('endoClinicalImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             EndoClinicalNotes.objects.update_or_create(endoClinicalImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = EndoClinicalNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = EndoClinicalNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Gastro
class GastroMicroNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GastroMicroNotes
        fields = ('id','noteContent','x','y')

class GastroMicroImageSerializer(serializers.ModelSerializer):
    notes = GastroMicroNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GastroMicroImage
        fields = ('id','image','notes')

class GastroMicroSerializer(serializers.ModelSerializer):

    images = GastroMicroImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GastroMicro
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        gastroMicro = GastroMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GastroMicroImage.objects.create(gastroMicro=gastroMicro, image=img)

        #RETURN
        return gastroMicro

    def update(self, instance, validated_data):
        #SET 
        gastroMicro = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GastroMicroImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GastroMicroImage.objects.create(gastroMicro=gastroMicro, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('gastroMicroImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GastroMicroNotes.objects.update_or_create(gastroMicroImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GastroMicroNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GastroMicroNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance


#Patho
class GastroPathoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GastroPathoNotes
        fields = ('id','noteContent','x','y')

class GastroPathoImageSerializer(serializers.ModelSerializer):
    notes = GastroPathoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GastroPathoImage
        fields = ('id','image','notes')

class GastroPathoSerializer(serializers.ModelSerializer):

    images = GastroPathoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GastroPatho
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        gastroPatho = GastroPatho.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GastroPathoImage.objects.create(gastroPatho=gastroPatho, image=img)

        #RETURN
        return gastroPatho

    def update(self, instance, validated_data):
        #SET 
        gastroPatho = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GastroPathoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GastroPathoImage.objects.create(gastroPatho=gastroPatho, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('gastroPathoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GastroPathoNotes.objects.update_or_create(gastroPathoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GastroPathoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GastroPathoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Imaging
class GastroImagingNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GastroImagingNotes
        fields = ('id','noteContent','x','y')

class GastroImagingImageSerializer(serializers.ModelSerializer):
    notes = GastroImagingNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GastroImagingImage
        fields = ('id','image','notes')

class GastroImagingSerializer(serializers.ModelSerializer):

    images = GastroImagingImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GastroImaging
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        gastroImaging = GastroImaging.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GastroImagingImage.objects.create(gastroImaging=gastroImaging, image=img)

        #RETURN
        return gastroImaging

    def update(self, instance, validated_data):
        #SET 
        gastroImaging = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GastroImagingImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GastroImagingImage.objects.create(gastroImaging=gastroImaging, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('gastroImagingImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GastroImagingNotes.objects.update_or_create(gastroImagingImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GastroImagingNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GastroImagingNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Histo
class GastroHistoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GastroHistoNotes
        fields = ('id','noteContent','x','y')

class GastroHistoImageSerializer(serializers.ModelSerializer):
    notes = GastroHistoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GastroHistoImage
        fields = ('id','image','notes')

class GastroHistoSerializer(serializers.ModelSerializer):

    images = GastroHistoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GastroHisto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        gastroHisto = GastroHisto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GastroHistoImage.objects.create(gastroHisto=gastroHisto, image=img)

        #RETURN
        return gastroHisto

    def update(self, instance, validated_data):
        #SET 
        gastroHisto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GastroHistoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GastroHistoImage.objects.create(gastroHisto=gastroHisto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('gastroHistoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GastroHistoNotes.objects.update_or_create(gastroHistoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GastroHistoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GastroHistoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Cyto
class GastroCytoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GastroCytoNotes
        fields = ('id','noteContent','x','y')

class GastroCytoImageSerializer(serializers.ModelSerializer):
    notes = GastroCytoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GastroCytoImage
        fields = ('id','image','notes')

class GastroCytoSerializer(serializers.ModelSerializer):

    images = GastroCytoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GastroCyto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        gastroCyto = GastroCyto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GastroCytoImage.objects.create(gastroCyto=gastroCyto, image=img)

        #RETURN
        return gastroCyto

    def update(self, instance, validated_data):
        #SET 
        gastroCyto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GastroCytoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GastroCytoImage.objects.create(gastroCyto=gastroCyto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('gastroCytoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GastroCytoNotes.objects.update_or_create(gastroCytoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GastroCytoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GastroCytoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Clinical
class GastroClinicalNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GastroClinicalNotes
        fields = ('id','noteContent','x','y')

class GastroClinicalImageSerializer(serializers.ModelSerializer):
    notes = GastroClinicalNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GastroClinicalImage
        fields = ('id','image','notes')

class GastroClinicalSerializer(serializers.ModelSerializer):

    images = GastroClinicalImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GastroClinical
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        gastroClinical = GastroClinical.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GastroClinicalImage.objects.create(gastroClinical=gastroClinical, image=img)

        #RETURN
        return gastroClinical

    def update(self, instance, validated_data):
        #SET 
        gastroClinical = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GastroClinicalImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GastroClinicalImage.objects.create(gastroClinical=gastroClinical, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('gastroClinicalImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GastroClinicalNotes.objects.update_or_create(gastroClinicalImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GastroClinicalNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GastroClinicalNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Genito
class GenitoMicroNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenitoMicroNotes
        fields = ('id','noteContent','x','y')

class GenitoMicroImageSerializer(serializers.ModelSerializer):
    notes = GenitoMicroNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GenitoMicroImage
        fields = ('id','image','notes')

class GenitoMicroSerializer(serializers.ModelSerializer):

    images = GenitoMicroImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GenitoMicro
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        genitoMicro = GenitoMicro.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GenitoMicroImage.objects.create(genitoMicro=genitoMicro, image=img)

        #RETURN
        return genitoMicro

    def update(self, instance, validated_data):
        #SET 
        genitoMicro = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GenitoMicroImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GenitoMicroImage.objects.create(genitoMicro=genitoMicro, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('genitoMicroImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GenitoMicroNotes.objects.update_or_create(genitoMicroImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GenitoMicroNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GenitoMicroNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance


#Patho
class GenitoPathoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenitoPathoNotes
        fields = ('id','noteContent','x','y')

class GenitoPathoImageSerializer(serializers.ModelSerializer):
    notes = GenitoPathoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GenitoPathoImage
        fields = ('id','image','notes')

class GenitoPathoSerializer(serializers.ModelSerializer):

    images = GenitoPathoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GenitoPatho
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        genitoPatho = GenitoPatho.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GenitoPathoImage.objects.create(genitoPatho=genitoPatho, image=img)

        #RETURN
        return genitoPatho

    def update(self, instance, validated_data):
        #SET 
        genitoPatho = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GenitoPathoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GenitoPathoImage.objects.create(genitoPatho=genitoPatho, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('genitoPathoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GenitoPathoNotes.objects.update_or_create(genitoPathoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GenitoPathoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GenitoPathoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Imaging
class GenitoImagingNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenitoImagingNotes
        fields = ('id','noteContent','x','y')

class GenitoImagingImageSerializer(serializers.ModelSerializer):
    notes = GenitoImagingNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GenitoImagingImage
        fields = ('id','image','notes')

class GenitoImagingSerializer(serializers.ModelSerializer):

    images = GenitoImagingImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GenitoImaging
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        genitoImaging = GenitoImaging.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GenitoImagingImage.objects.create(genitoImaging=genitoImaging, image=img)

        #RETURN
        return genitoImaging

    def update(self, instance, validated_data):
        #SET 
        genitoImaging = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GenitoImagingImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GenitoImagingImage.objects.create(genitoImaging=genitoImaging, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('genitoImagingImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GenitoImagingNotes.objects.update_or_create(genitoImagingImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GenitoImagingNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GenitoImagingNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Histo
class GenitoHistoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenitoHistoNotes
        fields = ('id','noteContent','x','y')

class GenitoHistoImageSerializer(serializers.ModelSerializer):
    notes = GenitoHistoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GenitoHistoImage
        fields = ('id','image','notes')

class GenitoHistoSerializer(serializers.ModelSerializer):

    images = GenitoHistoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GenitoHisto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        genitoHisto = GenitoHisto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GenitoHistoImage.objects.create(genitoHisto=genitoHisto, image=img)

        #RETURN
        return genitoHisto

    def update(self, instance, validated_data):
        #SET 
        genitoHisto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GenitoHistoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GenitoHistoImage.objects.create(genitoHisto=genitoHisto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('genitoHistoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GenitoHistoNotes.objects.update_or_create(genitoHistoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GenitoHistoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GenitoHistoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Cyto
class GenitoCytoNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenitoCytoNotes
        fields = ('id','noteContent','x','y')

class GenitoCytoImageSerializer(serializers.ModelSerializer):
    notes = GenitoCytoNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GenitoCytoImage
        fields = ('id','image','notes')

class GenitoCytoSerializer(serializers.ModelSerializer):

    images = GenitoCytoImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GenitoCyto
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        genitoCyto = GenitoCyto.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GenitoCytoImage.objects.create(genitoCyto=genitoCyto, image=img)

        #RETURN
        return genitoCyto

    def update(self, instance, validated_data):
        #SET 
        genitoCyto = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GenitoCytoImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GenitoCytoImage.objects.create(genitoCyto=genitoCyto, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('genitoCytoImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GenitoCytoNotes.objects.update_or_create(genitoCytoImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GenitoCytoNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GenitoCytoNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

#Clinical
class GenitoClinicalNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenitoClinicalNotes
        fields = ('id','noteContent','x','y')

class GenitoClinicalImageSerializer(serializers.ModelSerializer):
    notes = GenitoClinicalNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = GenitoClinicalImage
        fields = ('id','image','notes')

class GenitoClinicalSerializer(serializers.ModelSerializer):

    images = GenitoClinicalImageSerializer(source='setImages', many=True, read_only=True)

    class Meta:
        model = GenitoClinical
        fields = ('id', 'title', 'description',  'images', 'owner_username', 'owner')
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        genitoClinical = GenitoClinical.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code
        images = images_data.getlist('image')
        for img in images:
            print(img)
            GenitoClinicalImage.objects.create(genitoClinical=genitoClinical, image=img)

        #RETURN
        return genitoClinical

    def update(self, instance, validated_data):
        #SET 
        genitoClinical = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = GenitoClinicalImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                GenitoClinicalImage.objects.create(genitoClinical=genitoClinical, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('genitoClinicalImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             GenitoClinicalNotes.objects.update_or_create(genitoClinicalImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = GenitoClinicalNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = GenitoClinicalNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance