from django.db import models
from django.contrib.auth.models import User

# def upload_path(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])
# def upload_pathh(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])

# class Lead(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField(max_length=100, unique=True)
#     message = models.CharField(max_length=500, blank=True)
#     owner = models.ForeignKey(
#         User, related_name="leads", on_delete=models.CASCADE, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)


#Blocks

#----------------------------------------------------------------------------------------------
#Resp

#Micro
class RespMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="respMicro", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(RespMicro, self).save(*args, **kwargs)

class RespMicroImage(models.Model):
    respMicro = models.ForeignKey(RespMicro, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Repiratory/Microbiology', blank=True, null=True)

class RespMicroNotes(models.Model):
    respMicroImage = models.ForeignKey(RespMicroImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Patho
class RespPatho(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="respPatho", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(RespPatho, self).save(*args, **kwargs)

class RespPathoImage(models.Model):
    respPatho = models.ForeignKey(RespPatho, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Repiratory/Pathology', blank=True, null=True)

class RespPathoNotes(models.Model):
    respPathoImage = models.ForeignKey(RespPathoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Imaging
class RespImaging(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="respImaging", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(RespImaging, self).save(*args, **kwargs)

class RespImagingImage(models.Model):
    respImaging = models.ForeignKey(RespImaging, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Repiratory/Imaging', blank=True, null=True)

class RespImagingNotes(models.Model):
    respImagingImage = models.ForeignKey(RespImagingImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Histo
class RespHisto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="respHisto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(RespHisto, self).save(*args, **kwargs)

class RespHistoImage(models.Model):
    respHisto = models.ForeignKey(RespHisto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Repiratory/Histology', blank=True, null=True)

class RespHistoNotes(models.Model):
    respHistoImage = models.ForeignKey(RespHistoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Cyto
class RespCyto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="respCyto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(RespCyto, self).save(*args, **kwargs)

class RespCytoImage(models.Model):
    respCyto = models.ForeignKey(RespCyto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Repiratory/Cytology', blank=True, null=True)

class RespCytoNotes(models.Model):
    respCytoImage = models.ForeignKey(RespCytoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Clinical
class RespClinical(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="respClinical", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(RespClinical, self).save(*args, **kwargs)

class RespClinicalImage(models.Model):
    respClinical = models.ForeignKey(RespClinical, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Repiratory/Clinical', blank=True, null=True)

class RespClinicalNotes(models.Model):
    respClinicalImage = models.ForeignKey(RespClinicalImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)