# Generated by Django 4.0.2 on 2022-02-17 18:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_rename_url_repo_project_repository_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='is_active',
            new_name='active',
        ),
    ]
