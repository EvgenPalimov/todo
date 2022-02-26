from django.contrib import admin

# Register your models here.
from .models import Project, ToDo


admin.site.register(Project)
admin.site.register(ToDo)