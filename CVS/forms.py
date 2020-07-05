from django import forms
from .models import Set, Img, Note

#DataFlair
class SetCreateForm(forms.ModelForm):
    class Meta:
        model = Set
        fields = ['title', 'description']

class ImgCreateForm(forms.ModelForm):
    class Meta:
        model = Img
        fields = ['image']

class NoteCreateForm(forms.ModelForm):
    class Meta:
        model = Note
        fields = ['title', 'note', 'x_dim', 'y_dim']
