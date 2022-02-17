from django_filters import rest_framework as filters

from project.models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ToDoFilter(filters.FilterSet):
    created = filters.RangeFilter()

    class Meta:
        model = ToDo
        fields = ['project', 'created']
