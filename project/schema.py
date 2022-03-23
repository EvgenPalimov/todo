import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation

from project.models import ToDo, Project
from project.serializers import ProjectBaseModelSerializer
from usersapp.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(ObjectType):
    # Viewing data from models
    users = graphene.List(UserType)
    projects = graphene.List(ProjectType)
    todo = graphene.List(ToDoType)

    def resolve_users(root, info):
        return User.objects.all()

    def resolver_projects(root, info):
        return Project.objects.all()

    def resolver_todo(root, info):
        return ToDo.objects.all()

    # Filter
    user_filter = graphene.Field(UserType, id=graphene.Int())

    def resolve_user_filter(root, info, id=None):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    # Поиск заметок у пользователя
    todo_filter_user = graphene.List(ToDoType, username=graphene.String(required=False))

    def resolve_todo_filter_user(root, info, username=None):
        todo = ToDo.objects.all()
        if username:
            todo = todo.filter(user__username=username)
        return todo

    # Поиск пользователей которые участвуют в выбраном проекте
    users_filter_project = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_users_filter_project(root, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name=name)
        return projects


# Model User
class UserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username, first_name, last_name, email, password):
        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        user.save()
        return UserCreateMutation(user=user)


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)
        email = graphene.String(required=False)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, id, first_name, last_name, email):
        user = User.objects.get(id=id)
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        return UserUpdateMutation(user=user)


class UserDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, id):
        User.objects.get(id=id).delete()
        return UserDeleteMutation(user=None)


# Model Project
class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=False)
        repository = graphene.String(required=False)
        users_id = graphene.List(graphene.ID, required=True)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, description, repository, users_id):
        project = Project(
            name=name,
            description=description,
            repository=repository,
        )
        project.save()
        for user in users_id:
            project.users.add(int(user))
        return ProjectCreateMutation(project=project)


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        name = graphene.String(required=True)
        description = graphene.String(required=False)
        repository = graphene.String(required=False)
        users_id = graphene.List(graphene.ID, required=True)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, id, name, description, repository, users_id):
        project = Project.objects.get(id=id)
        project.name = name
        project.description = description
        project.repository = repository
        for user in users_id:
            project.users.add(int(user))
        project.save()
        return ProjectUpdateMutation(project=project)


class ProjectDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, id):
        Project.objects.get(id=id).delete()
        return ProjectDeleteMutation(project=None)


# Model ToDo
class ToDoCreateMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        project_id = graphene.ID(required=True)
        user_id = graphene.ID(required=True)
        is_active = graphene.Boolean()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, text, project_id, user_id):
        todo = ToDo(
            text=text,
            project_id=project_id,
            user_id=user_id
        )
        todo.save()
        return ToDoCreateMutation(todo=todo)


class ToDoUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        text = graphene.String(required=True)
        project_id = graphene.ID(required=True)
        user_id = graphene.ID(required=True)

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, id, text, project_id, user_id):
        todo = ToDo.objects.get(id=id)
        todo.text = text
        todo.project_id = project_id
        todo.user_id = user_id
        todo.save()
        return ToDoUpdateMutation(todo=todo)


class ToDoDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, id):
        ToDo.objects.get(id=id).delete()
        return ToDoDeleteMutation(todo=None)


class Mutations(ObjectType):
    user_update = UserUpdateMutation.Field()
    user_create = UserCreateMutation.Field()
    user_delete = UserDeleteMutation.Field()
    project_create = ProjectCreateMutation.Field()
    project_update = ProjectUpdateMutation.Field()
    project_delete = ProjectDeleteMutation.Field()
    todo_create = ToDoCreateMutation.Field()
    todo_update = ToDoUpdateMutation.Field()
    todo_delete = ToDoDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
