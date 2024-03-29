## Проект "ToDo!"

### Базовая документация к проекту

Основные системные требования:

* Ubuntu 20.04 LTS
* Python 3.9
* Django 4.0.2
* Django REST 3.13.1
* React 17.0.2
* Docker Compose

Сайт для внутреннего использования, для размещения заметок и замечаний к 
проектам. Реализован CRUD-механизм для пользователей, проектов и заметок. 
Разработан на Django vs React. 

### Установка необходимого ПО

#### Обновляем информацию о репозиториях

```
apt update
```

#### Установка Docker Engine

Ссылка на официальный сайт Docker c подробным описанием установки
```
https://docs.docker.com/engine/install/debian/
```

#### Установка проекта на сервер

Клонируем проект с GitHub:

```
git clone https://github.com/EvgenPalimov/todo.git
```

Переходим в проект и запускаем команду запуска Docker-контейнеров

```
cd todo
sudo docker-compose -f docker-compose.yml up -d --build
```

Проверяем, что все контейнеры удачно запущены

```
sudo docker ps -a
```

### Если всё успешно, то можно ввести в браузере ip-адрес сервера 
и откроется проект.
