from django.db import models
from django.contrib.auth.models import User

def upload_path(instance, filename):
    return '/'.join(['RespMicro', str(instance.title), filename])
# def upload_pathh(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])

# class Lead(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField(max_length=100, unique=True)
#     message = models.CharField(max_length=500, blank=True)
#     owner = models.ForeignKey(
#         User, related_name="leads", on_delete=models.CASCADE, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)



class RespMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner_id = models.ForeignKey(
    User, related_name="respMicro", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(RespMicro, self).save(*args, **kwargs)

class RespMicroImage(models.Model):
    respMicro = models.ForeignKey(RespMicro, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='testing4/', blank=True, null=True)

class RespMicroNotes(models.Model):
    respMicroImage = models.ForeignKey(RespMicroImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)


