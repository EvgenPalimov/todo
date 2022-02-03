from django.contrib import admin

# Register your models here.
from authors.models import Author


@admin.register(Author)
class Author(admin.ModelAdmin):

    list_display = ('first_name', 'last_name', 'birthday_year',)
    ordering = ('last_name',)
    search_fields = ('last_name', 'first_name', 'birthday_year',)