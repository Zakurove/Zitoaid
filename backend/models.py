from django.db import models
from django.contrib.auth.models import User

# def upload_path(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])
# def upload_pathh(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])


# ----------------------------------------------------------------------------------------------



# Set
class Set(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    block = models.CharField(blank=True, null=True, max_length=20)
    subject = models.CharField(blank=True, null=True, max_length=20)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="set", on_delete=models.CASCADE, null=True)
    
    def save(self, *args, **kwargs):
        super(Set, self).save(*args, **kwargs)


class SetImage(models.Model):
    set = models.ForeignKey(Set, on_delete=models.CASCADE,
                            null=True, related_name='setImages')
    image = models.ImageField(upload_to='Sets', blank=True, null=True)


class SetNotes(models.Model):
    setImage = models.ForeignKey(
        SetImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)



#Cluster
class Cluster(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    block = models.CharField(blank=True, null=True, max_length=20)
    subject = models.CharField(blank=True, null=True, max_length=20)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="cluster", on_delete=models.CASCADE, null=True)
    #Many to many relationship between sets and clusters
    sets = models.ManyToManyField(Set, related_name='clusters', blank=True)

    def save(self, *args, **kwargs):
        super(Cluster, self).save(*args, **kwargs)