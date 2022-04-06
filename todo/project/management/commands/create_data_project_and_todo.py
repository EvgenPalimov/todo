from mixer.backend.django import mixer
from django.core.management.base import BaseCommand

from project.models import Project, ToDo


class Command(BaseCommand):
    help = 'Create test data for Project and ToDo'

    # def add_arguments(self, parser):
    #     parser.add_argument('count', type=int)

    def handle(self, *args, **options):

        # Delete all data from Project and ToDo
        Project.objects.all().delete()
        ToDo.objects.all().delete()

        # Create data
        count = 10
        for i in range(count):
            mixer.blend(Project)
            mixer.blend(ToDo)

        print('Create data from Project and ToDo')
