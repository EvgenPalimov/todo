from django.contrib import admin

# Register your models here.
from usersapp.models import User


@admin.register(User)
class Users(admin.ModelAdmin):

    list_display = ('username', 'first_name', 'last_name', 'email',)
    ordering = ('username',)
    search_fields = ('username', 'email')
