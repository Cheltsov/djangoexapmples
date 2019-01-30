from django.shortcuts import render

def index(request):
    return render(request,'mainapp/homePage.html')

def contact(request):
    return render(request, 'mainapp/basic.html',{'values':['Если у вас остались вопросы, то задавайти их мне по телефону',"(380)635745035"]})
