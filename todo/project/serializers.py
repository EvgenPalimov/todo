from rest_framework import serializers

from project.models import Project, ToDo
from usersapp.models import User


class ProjectBaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializer(serializers.ModelSerializer):
    users = serializers.SlugRelatedField(
        many=True,
        slug_field='username',
        queryset=User.objects
    )

    class Meta:
        model = Project
        fields = '__all__'


class ToDoBaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        exclude = ('active',)


class ToDoModelSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects
    )

    project = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Project.objects
    )

    class Meta:
        model = ToDo
        exclude = ('active',)
