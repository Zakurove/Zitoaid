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
    image = models.ImageField( upload_to='Blocks/Respiratory/Microbiology', blank=True, null=True)

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
    image = models.ImageField( upload_to='Blocks/Respiratory/Pathology', blank=True, null=True)

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
    image = models.ImageField( upload_to='Blocks/Respiratory/Imaging', blank=True, null=True)

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
    image = models.ImageField( upload_to='Blocks/Respiratory/Histology', blank=True, null=True)

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
    image = models.ImageField( upload_to='Blocks/Respiratory/Cytology', blank=True, null=True)

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
    image = models.ImageField( upload_to='Blocks/Respiratory/Clinical', blank=True, null=True)

class RespClinicalNotes(models.Model):
    respClinicalImage = models.ForeignKey(RespClinicalImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)


#Cardio

#Micro
class CardioMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="cardioMicro", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(CardioMicro, self).save(*args, **kwargs)

class CardioMicroImage(models.Model):
    cardioMicro = models.ForeignKey(CardioMicro, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Cardiology/Microbiology', blank=True, null=True)

class CardioMicroNotes(models.Model):
    cardioMicroImage = models.ForeignKey(CardioMicroImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Patho
class CardioPatho(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="cardioPatho", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(CardioPatho, self).save(*args, **kwargs)

class CardioPathoImage(models.Model):
    cardioPatho = models.ForeignKey(CardioPatho, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Cardiology/Pathology', blank=True, null=True)

class CardioPathoNotes(models.Model):
    cardioPathoImage = models.ForeignKey(CardioPathoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Imaging
class CardioImaging(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="cardioImaging", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(CardioImaging, self).save(*args, **kwargs)

class CardioImagingImage(models.Model):
    cardioImaging = models.ForeignKey(CardioImaging, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Cardiology/Imaging', blank=True, null=True)

class CardioImagingNotes(models.Model):
    cardioImagingImage = models.ForeignKey(CardioImagingImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Histo
class CardioHisto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="cardioHisto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(CardioHisto, self).save(*args, **kwargs)

class CardioHistoImage(models.Model):
    cardioHisto = models.ForeignKey(CardioHisto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Cardiology/Histology', blank=True, null=True)

class CardioHistoNotes(models.Model):
    cardioHistoImage = models.ForeignKey(CardioHistoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Cyto
class CardioCyto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="cardioCyto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(CardioCyto, self).save(*args, **kwargs)

class CardioCytoImage(models.Model):
    cardioCyto = models.ForeignKey(CardioCyto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Cardiology/Cytology', blank=True, null=True)

class CardioCytoNotes(models.Model):
    cardioCytoImage = models.ForeignKey(CardioCytoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Clinical
class CardioClinical(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="cardioClinical", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(CardioClinical, self).save(*args, **kwargs)

class CardioClinicalImage(models.Model):
    cardioClinical = models.ForeignKey(CardioClinical, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Cardiology/Clinical', blank=True, null=True)

class CardioClinicalNotes(models.Model):
    cardioClinicalImage = models.ForeignKey(CardioClinicalImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#MSK

#Micro
class MSKMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="mskMicro", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(MSKMicro, self).save(*args, **kwargs)

class MSKMicroImage(models.Model):
    mskMicro = models.ForeignKey(MSKMicro, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/MSK/Microbiology', blank=True, null=True)

class MSKMicroNotes(models.Model):
    mskMicroImage = models.ForeignKey(MSKMicroImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Patho
class MSKPatho(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="mskPatho", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(MSKPatho, self).save(*args, **kwargs)

class MSKPathoImage(models.Model):
    mskPatho = models.ForeignKey(MSKPatho, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/MSK/Pathology', blank=True, null=True)

class MSKPathoNotes(models.Model):
    mskPathoImage = models.ForeignKey(MSKPathoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Imaging
class MSKImaging(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="mskImaging", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(MSKImaging, self).save(*args, **kwargs)

class MSKImagingImage(models.Model):
    mskImaging = models.ForeignKey(MSKImaging, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/MSK/Imaging', blank=True, null=True)

class MSKImagingNotes(models.Model):
    mskImagingImage = models.ForeignKey(MSKImagingImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Histo
class MSKHisto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="mskHisto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(MSKHisto, self).save(*args, **kwargs)

class MSKHistoImage(models.Model):
    mskHisto = models.ForeignKey(MSKHisto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/MSK/Histology', blank=True, null=True)

class MSKHistoNotes(models.Model):
    mskHistoImage = models.ForeignKey(MSKHistoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Cyto
class MSKCyto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="mskCyto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(MSKCyto, self).save(*args, **kwargs)

class MSKCytoImage(models.Model):
    mskCyto = models.ForeignKey(MSKCyto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/MSK/Cytology', blank=True, null=True)

class MSKCytoNotes(models.Model):
    mskCytoImage = models.ForeignKey(MSKCytoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Clinical
class MSKClinical(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="mskClinical", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(MSKClinical, self).save(*args, **kwargs)

class MSKClinicalImage(models.Model):
    mskClinical = models.ForeignKey(MSKClinical, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/MSK/Clinical', blank=True, null=True)

class MSKClinicalNotes(models.Model):
    mskClinicalImage = models.ForeignKey(MSKClinicalImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Hema

#Micro
class HemaMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="hemaMicro", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(HemaMicro, self).save(*args, **kwargs)

class HemaMicroImage(models.Model):
    hemaMicro = models.ForeignKey(HemaMicro, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/HemeOnc/Microbiology', blank=True, null=True)

class HemaMicroNotes(models.Model):
    hemaMicroImage = models.ForeignKey(HemaMicroImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Patho
class HemaPatho(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="hemaPatho", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(HemaPatho, self).save(*args, **kwargs)

class HemaPathoImage(models.Model):
    hemaPatho = models.ForeignKey(HemaPatho, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/HemeOnc/Pathology', blank=True, null=True)

class HemaPathoNotes(models.Model):
    hemaPathoImage = models.ForeignKey(HemaPathoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Imaging
class HemaImaging(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="hemaImaging", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(HemaImaging, self).save(*args, **kwargs)

class HemaImagingImage(models.Model):
    hemaImaging = models.ForeignKey(HemaImaging, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/HemeOnc/Imaging', blank=True, null=True)

class HemaImagingNotes(models.Model):
    hemaImagingImage = models.ForeignKey(HemaImagingImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Histo
class HemaHisto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="hemaHisto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(HemaHisto, self).save(*args, **kwargs)

class HemaHistoImage(models.Model):
    hemaHisto = models.ForeignKey(HemaHisto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/HemeOnc/Histology', blank=True, null=True)

class HemaHistoNotes(models.Model):
    hemaHistoImage = models.ForeignKey(HemaHistoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Cyto
class HemaCyto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="hemaCyto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(HemaCyto, self).save(*args, **kwargs)

class HemaCytoImage(models.Model):
    hemaCyto = models.ForeignKey(HemaCyto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/HemeOnc/Cytology', blank=True, null=True)

class HemaCytoNotes(models.Model):
    hemaCytoImage = models.ForeignKey(HemaCytoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Clinical
class HemaClinical(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="hemaClinical", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(HemaClinical, self).save(*args, **kwargs)

class HemaClinicalImage(models.Model):
    hemaClinical = models.ForeignKey(HemaClinical, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/HemeOnc/Clinical', blank=True, null=True)

class HemaClinicalNotes(models.Model):
    hemaClinicalImage = models.ForeignKey(HemaClinicalImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Neuro

#Micro
class NeuroMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="neuroMicro", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(NeuroMicro, self).save(*args, **kwargs)

class NeuroMicroImage(models.Model):
    neuroMicro = models.ForeignKey(NeuroMicro, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Neurology/Microbiology', blank=True, null=True)

class NeuroMicroNotes(models.Model):
    neuroMicroImage = models.ForeignKey(NeuroMicroImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Patho
class NeuroPatho(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="neuroPatho", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(NeuroPatho, self).save(*args, **kwargs)

class NeuroPathoImage(models.Model):
    neuroPatho = models.ForeignKey(NeuroPatho, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Neurology/Pathology', blank=True, null=True)

class NeuroPathoNotes(models.Model):
    neuroPathoImage = models.ForeignKey(NeuroPathoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Imaging
class NeuroImaging(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="neuroImaging", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(NeuroImaging, self).save(*args, **kwargs)

class NeuroImagingImage(models.Model):
    neuroImaging = models.ForeignKey(NeuroImaging, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Neurology/Imaging', blank=True, null=True)

class NeuroImagingNotes(models.Model):
    neuroImagingImage = models.ForeignKey(NeuroImagingImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Histo
class NeuroHisto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="neuroHisto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(NeuroHisto, self).save(*args, **kwargs)

class NeuroHistoImage(models.Model):
    neuroHisto = models.ForeignKey(NeuroHisto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Neurology/Histology', blank=True, null=True)

class NeuroHistoNotes(models.Model):
    neuroHistoImage = models.ForeignKey(NeuroHistoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Cyto
class NeuroCyto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="neuroCyto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(NeuroCyto, self).save(*args, **kwargs)

class NeuroCytoImage(models.Model):
    neuroCyto = models.ForeignKey(NeuroCyto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Neurology/Cytology', blank=True, null=True)

class NeuroCytoNotes(models.Model):
    neuroCytoImage = models.ForeignKey(NeuroCytoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Clinical
class NeuroClinical(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="neuroClinical", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(NeuroClinical, self).save(*args, **kwargs)

class NeuroClinicalImage(models.Model):
    neuroClinical = models.ForeignKey(NeuroClinical, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Neurology/Clinical', blank=True, null=True)

class NeuroClinicalNotes(models.Model):
    neuroClinicalImage = models.ForeignKey(NeuroClinicalImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Endo

#Micro
class EndoMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="endoMicro", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(EndoMicro, self).save(*args, **kwargs)

class EndoMicroImage(models.Model):
    endoMicro = models.ForeignKey(EndoMicro, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Endocrine/Microbiology', blank=True, null=True)

class EndoMicroNotes(models.Model):
    endoMicroImage = models.ForeignKey(EndoMicroImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Patho
class EndoPatho(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="endoPatho", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(EndoPatho, self).save(*args, **kwargs)

class EndoPathoImage(models.Model):
    endoPatho = models.ForeignKey(EndoPatho, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Endocrine/Pathology', blank=True, null=True)

class EndoPathoNotes(models.Model):
    endoPathoImage = models.ForeignKey(EndoPathoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Imaging
class EndoImaging(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="endoImaging", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(EndoImaging, self).save(*args, **kwargs)

class EndoImagingImage(models.Model):
    endoImaging = models.ForeignKey(EndoImaging, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Endocrine/Imaging', blank=True, null=True)

class EndoImagingNotes(models.Model):
    endoImagingImage = models.ForeignKey(EndoImagingImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Histo
class EndoHisto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="endoHisto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(EndoHisto, self).save(*args, **kwargs)

class EndoHistoImage(models.Model):
    endoHisto = models.ForeignKey(EndoHisto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Endocrine/Histology', blank=True, null=True)

class EndoHistoNotes(models.Model):
    endoHistoImage = models.ForeignKey(EndoHistoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Cyto
class EndoCyto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="endoCyto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(EndoCyto, self).save(*args, **kwargs)

class EndoCytoImage(models.Model):
    endoCyto = models.ForeignKey(EndoCyto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Endocrine/Cytology', blank=True, null=True)

class EndoCytoNotes(models.Model):
    endoCytoImage = models.ForeignKey(EndoCytoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Clinical
class EndoClinical(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="endoClinical", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(EndoClinical, self).save(*args, **kwargs)

class EndoClinicalImage(models.Model):
    endoClinical = models.ForeignKey(EndoClinical, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Endocrine/Clinical', blank=True, null=True)

class EndoClinicalNotes(models.Model):
    endoClinicalImage = models.ForeignKey(EndoClinicalImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Gastro

#Micro
class GastroMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="gastroMicro", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GastroMicro, self).save(*args, **kwargs)

class GastroMicroImage(models.Model):
    gastroMicro = models.ForeignKey(GastroMicro, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Gastrointestinal/Microbiology', blank=True, null=True)

class GastroMicroNotes(models.Model):
    gastroMicroImage = models.ForeignKey(GastroMicroImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Patho
class GastroPatho(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="gastroPatho", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GastroPatho, self).save(*args, **kwargs)

class GastroPathoImage(models.Model):
    gastroPatho = models.ForeignKey(GastroPatho, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Gastrointestinal/Pathology', blank=True, null=True)

class GastroPathoNotes(models.Model):
    gastroPathoImage = models.ForeignKey(GastroPathoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Imaging
class GastroImaging(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="gastroImaging", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GastroImaging, self).save(*args, **kwargs)

class GastroImagingImage(models.Model):
    gastroImaging = models.ForeignKey(GastroImaging, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Gastrointestinal/Imaging', blank=True, null=True)

class GastroImagingNotes(models.Model):
    gastroImagingImage = models.ForeignKey(GastroImagingImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Histo
class GastroHisto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="gastroHisto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GastroHisto, self).save(*args, **kwargs)

class GastroHistoImage(models.Model):
    gastroHisto = models.ForeignKey(GastroHisto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Gastrointestinal/Histology', blank=True, null=True)

class GastroHistoNotes(models.Model):
    gastroHistoImage = models.ForeignKey(GastroHistoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Cyto
class GastroCyto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="gastroCyto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GastroCyto, self).save(*args, **kwargs)

class GastroCytoImage(models.Model):
    gastroCyto = models.ForeignKey(GastroCyto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Gastrointestinal/Cytology', blank=True, null=True)

class GastroCytoNotes(models.Model):
    gastroCytoImage = models.ForeignKey(GastroCytoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Clinical
class GastroClinical(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="gastroClinical", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GastroClinical, self).save(*args, **kwargs)

class GastroClinicalImage(models.Model):
    gastroClinical = models.ForeignKey(GastroClinical, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Gastrointestinal/Clinical', blank=True, null=True)

class GastroClinicalNotes(models.Model):
    gastroClinicalImage = models.ForeignKey(GastroClinicalImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Genito

#Micro
class GenitoMicro(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="genitoMicro", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GenitoMicro, self).save(*args, **kwargs)

class GenitoMicroImage(models.Model):
    genitoMicro = models.ForeignKey(GenitoMicro, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Genitourinary/Microbiology', blank=True, null=True)

class GenitoMicroNotes(models.Model):
    genitoMicroImage = models.ForeignKey(GenitoMicroImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Patho
class GenitoPatho(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="genitoPatho", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GenitoPatho, self).save(*args, **kwargs)

class GenitoPathoImage(models.Model):
    genitoPatho = models.ForeignKey(GenitoPatho, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Genitourinary/Pathology', blank=True, null=True)

class GenitoPathoNotes(models.Model):
    genitoPathoImage = models.ForeignKey(GenitoPathoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Imaging
class GenitoImaging(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="genitoImaging", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GenitoImaging, self).save(*args, **kwargs)

class GenitoImagingImage(models.Model):
    genitoImaging = models.ForeignKey(GenitoImaging, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Genitourinary/Imaging', blank=True, null=True)

class GenitoImagingNotes(models.Model):
    genitoImagingImage = models.ForeignKey(GenitoImagingImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Histo
class GenitoHisto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="genitoHisto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GenitoHisto, self).save(*args, **kwargs)

class GenitoHistoImage(models.Model):
    genitoHisto = models.ForeignKey(GenitoHisto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Genitourinary/Histology', blank=True, null=True)

class GenitoHistoNotes(models.Model):
    genitoHistoImage = models.ForeignKey(GenitoHistoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Cyto
class GenitoCyto(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="genitoCyto", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GenitoCyto, self).save(*args, **kwargs)

class GenitoCytoImage(models.Model):
    genitoCyto = models.ForeignKey(GenitoCyto, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Genitourinary/Cytology', blank=True, null=True)

class GenitoCytoNotes(models.Model):
    genitoCytoImage = models.ForeignKey(GenitoCytoImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

#Clinical
class GenitoClinical(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner_username = models.CharField(max_length=30,null=True)
    owner = models.ForeignKey(
    User, related_name="genitoClinical", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        super(GenitoClinical, self).save(*args, **kwargs)

class GenitoClinicalImage(models.Model):
    genitoClinical = models.ForeignKey(GenitoClinical, on_delete=models.CASCADE, null=True, related_name='setImages')
    image = models.ImageField( upload_to='Blocks/Genitourinary/Clinical', blank=True, null=True)

class GenitoClinicalNotes(models.Model):
    genitoClinicalImage = models.ForeignKey(GenitoClinicalImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)