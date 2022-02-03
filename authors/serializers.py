from rest_framework.serializers import ModelSerializer

from usersapp.models import User
from .models import Author

class AuthorModelSerializer(ModelSerializer):

    class Meta:
        model = Author
        fields = '__all__'

class UserModelSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')
