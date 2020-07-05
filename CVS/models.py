from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    note = models.TextField()
    title = models.CharField(max_length=250, default='Title')
    x_dim = models.IntegerField(blank=True, null=True)
    y_dim = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.title
class Img(models.Model):
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    notes = models.ManyToManyField(Note, related_name='image_notes')

    def __str__(self):
        return str(self.image.name)

class Set(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='set_author')
    images = models.ManyToManyField(Img, related_name='set_imgs')

    def __str__(self):
        return self.title
