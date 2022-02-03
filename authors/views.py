from rest_framework.viewsets import ModelViewSet

from usersapp.models import User
from .models import Author
from .serializers import AuthorModelSerializer, UserModelSerializer


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer