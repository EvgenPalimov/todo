from django_filters import rest_framework as filters

from project.models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class ToDoFilter(filters.FilterSet):
    project = CharFilterInFilter(field_name='project__name', lookup_expr='in')
    created = filters.RangeFilter()

    class Meta:
        model = ToDo
        fields = ['project', 'created']
