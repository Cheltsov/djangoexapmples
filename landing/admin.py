from django.contrib import admin
from landing.models import Subcriber


class SubcriberAdmin(admin.ModelAdmin):
    #list_display = ["name", "email"]
    list_display = [field.name for field in Subcriber._meta.fields]
    # Отображение полей для редактирования
    fields = ["email", "name"] # какие отображать
    #exclude = ["email"] # какие не отображать
    #Поле по которому можно фильтровать по нажатию
    list_filter = ["name"]
    #Фильтровать по input
    search_fields = ["name"]

    class Meta:
        model = Subcriber

admin.site.register(Subcriber, SubcriberAdmin)

