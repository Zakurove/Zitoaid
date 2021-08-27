from rest_framework import serializers
from .models import Set, SetImage, SetNotes, Cluster, PracticeDescInput, PracticeDescSession
import logging
import json
import sys
import re



#PracticeDescSession
class PracticeDescSessionSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['-id']
        model = PracticeDescSession
        fields = ('id', 'date','block', 'owner_username', 'owner', 'sets', 'practiceDescInputs' )
        extra_kwargs = {'sets': {'required': False}}
        extra_kwargs = {'practiceDescInputs': {'required': False}}
  
    def create(self, validated_data):
        #PracticeDescInput
        creator = self.context['request'].user
        practiceDescSession = PracticeDescSession.objects.create(block=self.context.get('view').request.data.get('block'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )
        #Get the sets array from frotnend
        setsArray =self.context.get('view').request.data.get('setsArray')
        #To split set ids
        setsArray = setsArray.split(',')
        practiceDescSession.sets.set(setsArray)
        # #Get the inputs array from frotnend
        # inputsArray =self.context.get('view').request.data.get('inputsArray')
        # #To split input ids
        # inputsArray = inputsArray.split(',')
        # practiceDescSession.practiceDescInputs.set(inputsArray)
        #RETURN
        return practiceDescSession

    # def update(self, instance, validated_data):
    #     #CLUSTER
    #     cluster = instance
    #     instance.title = validated_data['title']
    #     instance.description = validated_data['description']
    #     setsArray =self.context.get('view').request.data.get('setsArray')
    #     setsArray = setsArray.split(',')
    #     print(setsArray)

    #     instance.sets.set(setsArray)

    #     #Saving and returning

    #     instance.save()
    #     return instance


#PracticeDescInput
class PracticeDescInputSerializer(serializers.ModelSerializer):
    practiceDescSessions = PracticeDescSessionSerializer ( read_only=True, many=True)
    class Meta:
        ordering = ['-id']
        model = PracticeDescInput
        fields = ('id', 'description','block', 'owner_username', 'owner', 'sets', 'practiceDescSessions' )
        extra_kwargs = {'sets': {'required': False}}
        extra_kwargs = {'practiceDescSessions': {'required': False}}
  
    def create(self, validated_data):
        #PracticeDescInput
        creator = self.context['request'].user
        practiceDescInput = PracticeDescInput.objects.create(description=validated_data.get('description', 'no-description'),block=self.context.get('view').request.data.get('block'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )

        setID =self.context.get('view').request.data.get('setId')
        setID = setID.split(',')

        practiceDescInput.sets.set(setID)

        sessionID =self.context.get('view').request.data.get('sessionId')
        sessionID = sessionID.split(',')
        practiceDescInput.practiceDescSessions.set(sessionID)
        #RETURN
        return practiceDescInput

    # def update(self, instance, validated_data):
    #     #CLUSTER
    #     cluster = instance
    #     instance.title = validated_data['title']
    #     instance.description = validated_data['description']
    #     setsArray =self.context.get('view').request.data.get('setsArray')
    #     setsArray = setsArray.split(',')
    #     print(setsArray)

    #     instance.sets.set(setsArray)

    #     #Saving and returning

    #     instance.save()
    #     return instance



#Cluster
class ClusterSerializer(serializers.ModelSerializer):
    #Many to many relationship between sets and clusters
    # sets = SetSerializer(many=True, read_only=True)
    class Meta:
        ordering = ['-id']
        model = Cluster
        fields = ('id', 'title', 'description','block', 'subject', 'owner_username', 'owner', 'sets')
        extra_kwargs = {'sets': {'required': False}}
  
    def create(self, validated_data):
        #Cluster
        creator = self.context['request'].user
        cluster = Cluster.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'),block=self.context.get('view').request.data.get('block'),subject=self.context.get('view').request.data.get('subject'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )
        #Get the sets array from fronend
        setsArray =self.context.get('view').request.data.get('setsArray')
        #To split set ids
        setsArray = setsArray.split(',')
        cluster.sets.set(setsArray)
        #Adding the sets one by one, bun intended (One is the name of my cat)
        # for set in setsArray:
        #     cluster.sets.add(set)
        #RETURN
        return cluster

    def update(self, instance, validated_data):
        #CLUSTER
        cluster = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']
        setsArray =self.context.get('view').request.data.get('setsArray')
        setsArray = setsArray.split(',')
        print(setsArray)

        instance.sets.set(setsArray)

        #Saving and returning

        instance.save()
        return instance



#---Set Items:
#Set Notes
class SetNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetNotes
        fields = ('id','noteContent','x','y')

#Set Images
class SetImageSerializer(serializers.ModelSerializer):
    notes = SetNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = SetImage
        fields = ('id','image','notes')

#The Set
class SetSerializer(serializers.ModelSerializer):

    images = SetImageSerializer(source='setImages', many=True, read_only=True)
    clusters = ClusterSerializer ( read_only=True, many=True)
    
    class Meta:
        ordering = ['-id']
        model = Set
        fields = ('id', 'title', 'description',  'images', 'block', 'subject', 'owner_username', 'owner', 'clusters')
        extra_kwargs = {'clusters': {'required': False}}
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        set = Set.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'),block=self.context.get('view').request.data.get('block'),subject=self.context.get('view').request.data.get('subject'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )


        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code (Three is the name of my cat)
        images = images_data.getlist('image')
        for img in images:
            print(img)
            SetImage.objects.create(set=set, image=img)

        #RETURN
        return set

    def update(self, instance, validated_data):
        #SET 
        set = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']

        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = SetImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                SetImage.objects.create(set=set, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('setImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             SetNotes.objects.update_or_create(setImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = SetNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = SetNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

