from django.db import models
from django.contrib.auth.models import User

# class MicroImg(models.Model):
#     image = models.ImageField(upload_to='images/', blank=True, null=True)
#     notes = models.ManyToManyField(Note, related_name='image_notes')
#
#     def __str__(self):
#         return str(self.image.name)

class MicroSet(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)
    #then go to api.py in leads
    author = models.ForeignKey(User, related_name="MicrosSETT", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Micro(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)
    #then go to api.py in leads
    author = models.ForeignKey(User, related_name="Micros", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

# class ImagingSet(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True, null=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='imagingSets')
#     # images = models.ManyToManyField(Img, related_name='imagingSetsImgs')
#     def __str__(self):
#         return self.title
#
# class PathoSet(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True, null=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pathoSets')
#     # images = models.ManyToManyField(Img, related_name='pathoSetsImgs')
#     def __str__(self):
#         return self.title
#
# class HistoSet(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True, null=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='histoSets')
#     #images = models.ManyToManyField(Img, related_name='histoSetsImgs')
#     def __str__(self):
#         return self.title
#
# class CytoSet(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True, null=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cytoSets')
#     #images = models.ManyToManyField(Img, related_name='cytoSetsImgs')
#     def __str__(self):
#         return self.title
#
# class ClinicalSet(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True, null=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='clinicalSets')
#     #images = models.ManyToManyField(Img, related_name='clinicalSetsImgs')
#     def __str__(self):
#         return self.title
