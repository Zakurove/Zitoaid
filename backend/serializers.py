from rest_framework import serializers
from .models import Complaint, Condition, Session
import logging
import json
import sys
import re
import random


#Session
class SessionSerializer(serializers.ModelSerializer):
    #Many to many relationship between sets and clusters
    # sets = SetSerializer(many=True, read_only=True)
    class Meta:
        ordering = ['-id']
        model = Session
        fields = ('id', 'date', 'mrn','patient_name', 'birth', 'owner_username', 'owner', 'conditions', 'complaints')
        extra_kwargs = {'conditions': {'required': False}}
        extra_kwargs = {'complaints': {'required': False}}
  
    def create(self, validated_data):
        #Cluster
        creator = self.context['request'].user
        session = Session.objects.create(mrn=validated_data.get('mrn', 'no-mrn'),patient_name=validated_data.get('patient_name', 'no-patient_name'),birth=validated_data.get('birth', 'no-birth'), owner= self.context['request'].user, owner_username= self.context['request'].user.name )
        #Get the sets array from fronend
        conditionsArray =self.context.get('view').request.data.get('conditionsArray')
        complaintsArray =self.context.get('view').request.data.get('complaintsArray')
        #To split set ids
        conditionsArray = conditionsArray.split(',')
        complaintsArray = complaintsArray.split(',')
        session.conditions.set(conditionsArray)
        session.complaints.set(complaintsArray)
        #Adding the sets one by one, bun intended (One is the name of my cat)
        # for set in setsArray:
        #     cluster.sets.add(set)
        #RETURN
        return session

    def update(self, instance, validated_data):
        #Session
        session = instance
        instance.mrn = validated_data['mrn']
        instance.patient_name = validated_data['patient_name']
        instance.birth = validated_data['birth']
        complaintsArray =self.context.get('view').request.data.get('complaintsArray')
        complaintsArray = complaintsArray.split(',')
        instance.complaints.set(complaintsArray)
        conditionsArray =self.context.get('view').request.data.get('conditionsArray')
        conditionsArray = conditionsArray.split(',')
        instance.conditions.set(conditionsArray)

        #Saving and returning

        instance.save()
        return instance

#Condition
class ConditionSerializer(serializers.ModelSerializer):
    #Many to many relationship between sets and clusters
    # sets = SetSerializer(many=True, read_only=True)
    sessions = SessionSerializer ( read_only=True, many=True)
    class Meta:
        ordering = ['-id']
        model = Condition
        fields = ('id', 'title', 'description','owner_username', 'owner', 'complaints','sessions')
        extra_kwargs = {'complaints': {'required': False}}
  
    def create(self, validated_data):
        #Condition
        creator = self.context['request'].user
        condition = Condition.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), owner= self.context['request'].user, owner_username= self.context['request'].user.name )
        #Get the sets array from fronend
        complaintsArray =self.context.get('view').request.data.get('complaintsArray')
        #To split set ids
        complaintsArray = complaintsArray.split(',')
        condition.complaints.set(complaintsArray)
        #Adding the sets one by one, bun intended (One is the name of my cat)
        # for set in setsArray:
        #     cluster.sets.add(set)
        #RETURN
        return condition

    def update(self, instance, validated_data):
        #Condition
        condition = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']
        complaintsArray =self.context.get('view').request.data.get('complaintsArray')
        complaintsArray = complaintsArray.split(',')
        print(complaintsArray)

        instance.complaints.set(complaintsArray)

        #Saving and returning

        instance.save()
        return instance

#The Complaint
class ComplaintSerializer(serializers.ModelSerializer):

    sessions = SessionSerializer ( read_only=True, many=True)
    conditions = ConditionSerializer ( read_only=True, many=True)
    class Meta:
        ordering = ['-id']
        model = Complaint
        fields = ('id', 'title', 'site', 'onset', 'characteristic', 'radation', 'timing', 'facotrs','criteria','owner_username', 'owner', 'conditions', 'sessions')
        extra_kwargs = {'sessions': {'required': False}}
        extra_kwargs = {'conditions': {'required': False}}
        
    def create(self, validated_data):
        #complaint
        creator = self.context['request'].user
        complaint = Complaint.objects.create(title=validated_data.get('title', 'no-title'),criteria=validated_data.get('criteria', 'no-criteria'), site=validated_data.get('site', 'no-site'), onset=validated_data.get('onset', 'no-onset'), characteristic=validated_data.get('characteristic', 'no-characteristic'),radation=validated_data.get('radation', 'no-radation'),timing=validated_data.get('timing', 'no-timing'),factorsBetter=validated_data.get('factorsBetter', 'no-factors'), factorsWorse=validated_data.get('factorsWorse', 'no-site'), extra1=validated_data.get('extra1', 'no-extra'), extra2=validated_data.get('extra2', 'no-site'), extra3=validated_data.get('extra3', 'no-site'), owner= self.context['request'].user, owner_username= self.context['request'].user.name )

        #RETURN
        return complaint

    def update(self, instance, validated_data):
        #SET 
        complaint = instance
        instance.title = validated_data['title']
        instance.criteria = validated_data['criteria']
        instance.site = validated_data['site']
        instance.onset = validated_data['onset']
        instance.characteristic = validated_data['characteristic']
        instance.radation = validated_data['radation']
        instance.timing = validated_data['timing']
        instance.factorsBetter = validated_data['factorsBetter']
        instance.factorsWorse = validated_data['factorsWorse']
        instance.extra1 = validated_data['extra1']
        instance.extra2 = validated_data['extra2']
        instance.extra3 = validated_data['extra3']


        #Saving and returning
        instance.save()
        return instance

