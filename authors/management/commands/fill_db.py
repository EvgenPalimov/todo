import json
from django.core.management.base import BaseCommand
from faker import Faker

from authors.models import Author
from usersapp.models import User


TEST_USER_QUANTITY = 4
FAKE = Faker()

def load_from_json(file_name):
    with open(file_name, mode='r', encoding='utf-8') as infile:
        return json.load(infile)

class Command(BaseCommand):
    def handle(self, *args, **options):
        authors = load_from_json('authors/fixtures/authors.json')

        Author.objects.all().delete()
        for author in authors:
            author_element = author.get('fields')
            author_element['id'] = author.get('pk')
            new_author = Author(**author_element)
            new_author.save()

        # users = load_from_json('usersapp/fixtures/users.json')

        User.objects.all().delete()
        User.objects.create_superuser(
            username='uegene', first_name='Uegene',last_name='Pavlovich',
            email='uegene@mail.ru', password='1')
        # for user in users:
        #     user_element = user.get('fields')
        #     user_element['id'] = user.get('pk')
        #     new_user = User.objects.create_user(**user_element)
        #     new_user.save()

        # Create user data
        first_name = [FAKE.unique.first_name() for _ in range(TEST_USER_QUANTITY)]
        last_name = [FAKE.unique.last_name() for _ in range(TEST_USER_QUANTITY)]
        emails = [FAKE.unique.last_name() for _ in range(TEST_USER_QUANTITY)]
        passwords = [FAKE.unique.first_name() for _ in range(TEST_USER_QUANTITY)]

        #Create test users

        for f_name, l_name, email, password in zip(first_name, last_name, emails, passwords):
            username = f'{f_name.lower()}_{l_name.lower()}'
            email = f'{l_name.lower()}@mail.ru'
            User.objects.create_user(
                username=username, email=email,
                first_name=f_name, last_name=l_name, password=password
            )



