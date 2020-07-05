from django.db import models
from django.contrib.auth.models import User

def upload_path(instance, filename):
    return '/'.join(['RespMicro', str(instance.title), filename])
# def upload_pathh(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)
    #then go to api.py in leads
    author = models.ForeignKey(User, related_name="lead", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)



# class RespMicro(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True, null=True)
#     author = models.ForeignKey(User, related_name="leads", on_delete=models.CASCADE, null=True)
#     images = models.ImageField(upload_to=upload_path, null=True)
#     def __str__(self):
#         return self.title




# class RespMicroImage(models.Model):
#     image = models.FileField(max_length=10000, upload_to=upload_path, blank=True, null=True)


class RespMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(
        User, related_name="RespMicroUser", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title

class RespMicroImage(models.Model):
    respMicro = models.ForeignKey(RespMicro, on_delete=models.CASCADE, null=True, related_name='images')
    image = models.FileField( upload_to='testing/', blank=True, null=True)
    # models.ImageField(blank=True, upload_to='testing/',null=True)




# class Post(models.Model):
#     title = models.CharField(max_length = 100)
#     content = models.TextField()
#     media = models.ForeignKey(Media, related_name='posts')
#
#     def __str__(self):
#         return self.tit
