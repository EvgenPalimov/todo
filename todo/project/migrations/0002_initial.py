# Generated by Django 4.0.2 on 2022-02-11 14:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
        migrations.AddField(
            model_name='project',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, verbose_name='Пользователи'),
        ),
    ]