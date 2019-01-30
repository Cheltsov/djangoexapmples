from django.shortcuts import render
from .forms import SubcribersForm

def index(request):
    form = SubcribersForm(request.POST or None)

    if(request.method == "POST" and form.is_valid()):
        #print(request.POST)
        print(form.cleaned_data)
        new_form = form.save()


    return render(request,'landing/home.html',locals())
