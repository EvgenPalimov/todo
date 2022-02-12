from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from project.filters import ProjectFilter, ToDoFilter
from project.models import Project, ToDo
from project.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filter_class = ProjectFilter


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filter_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        object = ToDo.objects.get(pk=kwargs['pk'])
        if object.is_active:
            object.is_active = False
            object.save()
        else:
            object.is_active = True
            object.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
