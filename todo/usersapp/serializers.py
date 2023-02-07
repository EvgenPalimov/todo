from rest_framework.serializers import ModelSerializer

from usersapp.models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            is_staff=validated_data['is_staff']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserBaseModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email',
                  'is_active', 'is_staff')


