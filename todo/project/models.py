from django.db import models

from usersapp.models import User


class Project(models.Model):
    name = models.CharField(verbose_name='Название проекта', max_length=100,
                            unique=True)
    description = models.TextField(verbose_name='Описание проекта', blank=True)
    repository = models.URLField(verbose_name='Ссылка на репозиторий',
                                 blank=True, null=True)
    users = models.ManyToManyField(User, verbose_name='Пользователи')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, verbose_name='Проект',
                                on_delete=models.CASCADE)
    text = models.TextField(verbose_name='Текст заметки', blank=True,
                            null=True)
    created = models.DateTimeField(verbose_name='Создан', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='Обновлен', auto_now=True)
    user = models.ForeignKey(User, verbose_name='Пользователь', null=True,
                             on_delete=models.SET_NULL)
    active = models.BooleanField(verbose_name='Активен', db_index=True,
                                 default=True)

    class Meta:
        ordering = ['-updated']

    def __str__(self):
        return self.text
