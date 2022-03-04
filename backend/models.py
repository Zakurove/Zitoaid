from numpy import character
from accounts.models import User
from django.db import models 
from django.db.models import JSONField

# def upload_path(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])
# def upload_pathh(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])


# ----------------------------------------------------------------------------------------------



# Complaint
class Complaint(models.Model):
    title = models.CharField(max_length=200)
    site = models.TextField(blank=True, null=True)
    onset = models.TextField(blank=True, null=True)
    characteristics = models.TextField(blank=True, null=True)
    radation = models.TextField(blank=True, null=True)
    timing = models.TextField(blank=True, null=True)
    factorsBetter = models.TextField(blank=True, null=True)
    factorsWorse = models.TextField(blank=True, null=True)
    criteria = models.TextField(blank=True, null=True)
    extra1 = models.TextField(blank=True, null=True)
    extra2 = models.TextField(blank=True, null=True)
    extra3 = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="complaint", on_delete=models.CASCADE, null=True)
    
    def save(self, *args, **kwargs):
        super(Complaint, self).save(*args, **kwargs)




#Condition
class Condition(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="condition", on_delete=models.CASCADE, null=True)
    #Many to many relationship between sets and clusters
    complaints = models.ManyToManyField(Complaint, related_name='conditions', blank=True)

    def save(self, *args, **kwargs):
        super(Condition, self).save(*args, **kwargs)

#Session
class Session(models.Model):
    date = models.DateField(auto_now_add=True, null=True)
    mrn = models.TextField(blank=True, null=True)
    patient_name = models.TextField(blank=True, null=True)
    birth = models.CharField(blank=True, null=True, max_length=20)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="session", on_delete=models.CASCADE, null=True)
    #Many to many relationship between sets and clusters
    complaints = models.ManyToManyField(Complaint, related_name='sessions', blank=True)
    conditions = models.ManyToManyField(Condition, related_name='sessionsConditions', blank=True)
    def save(self, *args, **kwargs):
        super(Session, self).save(*args, **kwargs)
