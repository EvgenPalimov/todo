from rest_framework import serializers

from project.models import Project, ToDo
from usersapp.models import User


class ProjectModelSerializer(serializers.ModelSerializer):
    users = serializers.SlugRelatedField(
        many=True,
        slug_field='username',
        queryset = User.objects
     )

    class Meta:
        model = Project
        fields = '__all__'

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
        fields = '__all__'