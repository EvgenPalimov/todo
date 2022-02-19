from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from project.filters import ProjectFilter, ToDoFilter
from project.models import Project, ToDo
from project.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectPageNumberPagination(PageNumberPagination):
    default_limit = 10


class ToDoPageNumberPagination(PageNumberPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectPageNumberPagination
    filter_class = ProjectFilter


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    # pagination_class = ToDoPageNumberPagination
    filter_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        try:
            object = ToDo.objects.get(pk=kwargs['pk'])
            if object.active:
                object.active = False
                object.save()
            else:
                object.active = True
                object.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
