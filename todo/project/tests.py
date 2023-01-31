from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, \
    APIClient, APITestCase, CoreAPIClient
from mixer.backend.django import mixer

from usersapp.models import User
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import ToDo, Project


# Create your tests here.

class TestProjectAndToDoViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.email = 'test@mail.ru'
        self.password = 'admin_123456789'

        self.admin = User.objects.create_superuser(self.name, self.email,
                                                   self.password)
        self.factory = APIRequestFactory()

        self.data_project = {'name': 'Test_1',
                             'description': 'Test_description',
                             'repository': 'https://github.com/1/',
                             'users': [1]}
        self.data_project_1 = {'name': 'Test_1',
                               'description': 'Test_description',
                               'repository': 'https://github.com/1/'}
        self.data_todo = {'project': 1, 'text': 'Test_1', 'user': 1}
        self.data_todo_mixer = mixer.blend(ToDo)
        self.data_project_put = {'name': 'Test_2',
                                 'description': 'Test_description_2',
                                 'repository': 'https://github.com/2/',
                                 'users': [1]}
        self.data_todo_put = {'project': 1, 'text': 'Test_2', 'user': 1}
        self.url_project = '/api/projects/'
        self.url_todo = '/api/todo/'

    # APIRequestFactory

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
        requests = self.factory.post(self.url_project, self.data_project,
                                     format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(requests)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_todo_guest(self):
        requests = self.factory.post(self.url_todo, self.data_todo,
                                     format='json')
        view = ToDoModelViewSet.as_view({'post': 'create'})
        response = view(requests)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_admin(self):
        request = self.factory.post(self.url_project, self.data_project,
                                    format='json')
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_todo_admin(self):
        request = self.factory.post(self.url_todo, self.data_todo,
                                    format='json')
        force_authenticate(request, self.admin)
        view = ToDoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # # APIClient
    def test_get_project_detail(self):
        client = APIClient()
        project = Project.objects.create(**self.data_project_1)
        project.users.add(self.admin)
        response = client.get(f'{self.url_project}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_project_guest(self):
        client = APIClient()
        project = Project.objects.create(**self.data_project_1)
        project.users.add(self.admin)
        response = client.put(f'{self.url_project}{project.id}/',
                              self.data_project_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_todo_guest(self):
        client = APIClient()
        todo = self.data_todo_mixer
        response = client.put(f'{self.url_todo}{todo.id}/', self.data_todo_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_project_admin(self):
        client = APIClient()
        project = Project.objects.create(**self.data_project_1)
        project.users.add(self.admin)
        client.login(username=self.name, password=self.password)
        response = client.put(f'{self.url_project}{project.id}/',
                              self.data_project_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project_ = Project.objects.get(id=project.id)
        self.assertEqual(project_.name, self.data_project_put['name'])
        self.assertEqual(project_.description,
                         self.data_project_put['description'])
        self.assertEqual(project_.repository,
                         self.data_project_put['repository'])
        client.logout()

    def test_put_todo_admin(self):
        client = APIClient()
        todo = self.data_todo_mixer
        client.login(username=self.name, password=self.password)
        response = client.put(f'{self.url_todo}{todo.id}/', self.data_todo_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()

    def tearDown(self) -> None:
        pass


class TestProjectAndToDo(APITestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.email = 'test@mail.ru'
        self.password = 'admin_123456789'

        self.admin = User.objects.create_superuser(self.name, self.email,
                                                   self.password)
        self.factory = APIRequestFactory()

        self.data_project = {'name': 'Test_1',
                             'description': 'Test_description',
                             'repository': 'https://github.com/1/'}
        self.data_todo = {'project': 1, 'text': 'Test_1', 'user': 1}
        self.data_project_mixer = mixer.blend(Project)
        self.data_todo_mixer = mixer.blend(ToDo)
        self.data_project_put = {'name': 'Test_2',
                                 'description': 'Test_description_2',
                                 'repository': 'https://github.com/2/',
                                 'users': [1]}
        self.data_todo_put = {'project': 1, 'text': 'Test_2', 'user': 1}
        self.url_project = '/api/projects/'
        self.url_todo = '/api/todo/'

    def test_get_project_list(self):
        response = self.client.get(self.url_project)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_todo_list(self):
        response = self.client.get(self.url_todo)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_project_admin(self):
        project = self.data_project_mixer
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url_project}{project.id}/',
                                   self.data_project_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project_ = Project.objects.get(id=project.id)
        self.assertEqual(project_.name, self.data_project_put['name'])
        self.assertEqual(project_.description,
                         self.data_project_put['description'])
        self.assertEqual(project_.repository,
                         self.data_project_put['repository'])
        self.client.logout()

    def test_put_todo_admin(self):
        project = Project.objects.create(**self.data_project)
        project.users.add(self.admin)
        todo = ToDo.objects.create(project=project, text='Test_1',
                                   user=self.admin)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url_todo}{todo.id}/',
                                   self.data_todo_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo_ = ToDo.objects.get(id=todo.id)

        self.assertEqual(todo_.text, self.data_todo_put['text'])
        self.client.logout()

    def test_delete_project_admin(self):
        project = self.data_project_mixer
        self.client.login(username=self.name, password=self.password)
        response = self.client.delete(f'{self.url_project}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.client.logout()

    def test_delete_todo_admin(self):
        todo = self.data_todo_mixer
        self.client.login(username=self.name, password=self.password)
        response = self.client.delete(f'{self.url_todo}{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.client.logout()

    def tearDown(self) -> None:
        pass
