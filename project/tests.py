from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer

from usersapp.models import User
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import ToDo, Project


# Create your tests here.

class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.email = 'test@mail.ru'
        self.password = 'admin_123456789'

        self.admin = User.objects.create_superuser(self.name, self.email, self.password)
        self.factory = APIRequestFactory()

        self.data_project = {'name': 'Test_1', 'description': 'Test_description', 'repository': 'https://github.com/1/',
                             'users': '1'}
        self.data_project_mixer = mixer.blend(Project)
        self.data_todo = {'project': 1, 'text': 'Test', 'user': 'user__id'}
        self.data_project_put = {'name': 'Test_2', 'description': 'Test_description',
                                 'repository': 'https://github.com/2/'}
        self.data_todo_put = {'project': 1, 'text': 'Test_2', 'user': 1}
        self.url_project = 'api/projects/'
        self.url_todo = 'api/todo/'

    #APIRequestFactory

    def test_get_list_project(self):
        requests = self.factory.get(self.url_project)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(requests)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_todo(self):
        requests = self.factory.get(self.url_todo)
        view = ToDoModelViewSet.as_view({'get': 'list'})
        response = view(requests)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_guest(self):
        requests = self.factory.post(self.url_project, self.data_project, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(requests)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_todo_guest(self):
        requests = self.factory.post(self.url_todo, self.data_todo, format='json')
        view = ToDoModelViewSet.as_view({'post': 'create'})
        response = view(requests)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_create_project_admin(self):
    #     request = self.factory.post(self.url_project, self.data_project, format='json')
    #     force_authenticate(request, self.admin)
    #     view = ProjectModelViewSet.as_view({'post': 'create'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #
    # def test_create_todo_admin(self):
    #     request = self.factory.post(self.url_todo, self.data_todo, format='json')
    #     force_authenticate(request, self.admin)
    #     view = ToDoModelViewSet.as_view({'post': 'create'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    #APIClient
    def test_get_project_detail(self):
        client = APIClient()
        project = mixer.blend(Project)
        response = client.get(f'project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self) -> None:
        pass
