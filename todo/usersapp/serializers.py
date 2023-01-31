from rest_framework.serializers import ModelSerializer

from usersapp.models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email',
                  'is_superuser', 'is_staff')


class UserBaseModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')
