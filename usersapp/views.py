from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from usersapp.models import User
from usersapp.serializers import UserModelSerializer, UserBaseModelSerializer


class UserViewSet(ViewSet, viewsets.GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserBaseModelSerializer
        return UserModelSerializer

    def list(self, request):
        base_serializer = self.get_serializer()
        serializer = base_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(self.queryset, pk=pk)
        serializer = UserModelSerializer(queryset)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        base_serializer = self.get_serializer()
        partial = kwargs.pop('partial', False)
        instance = self.queryset.get(pk=kwargs['pk'])
        serializer = base_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
