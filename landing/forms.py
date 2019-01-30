from django import forms
from .models import Subcriber

class SubcribersForm(forms.ModelForm):

    class Meta:
        model = Subcriber
        exclude = [""]

