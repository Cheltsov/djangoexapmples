from django.db import models

class Subcriber(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length=50)

    # Вывод таблицы
    def __str__(self):
        return "email= %s name= %s" % (self.email, self.name)

    # Изменение названия таблиц
    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

