from rest_framework import status
from rest_framework.generics import get_object_or_404, GenericAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from usersapp.models import User
from usersapp.serializers import UserModelSerializer, UserBaseModelSerializer


class UserViewSet(ViewSet, GenericAPIView):
    queryset = User.objects.filter(is_active=1)

    def get_serializer_class(self):
        if self.request.query_params.get('version') == 'v2':
            return UserModelSerializer
        return UserBaseModelSerializer

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(self.queryset, pk=pk)
        serializer = UserModelSerializer(queryset)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.queryset.get(pk=kwargs['pk'])
        serializer = self.get_serializer(instance, data=request.data,
                                         partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        try:
            object = User.objects.get(pk=kwargs['pk'])
            if object.is_active:
                object.is_active = False
                object.save()
            else:
                object.is_active = True
                object.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
