# README

## Getting started

This project requires Python 3 and Node v20.

Install the project dependencies:

```sh
# In the root of the project
$ pip install -r requirements.txt
# In the frontend/ directory
$ npm install
```

When setting it up for the first time, apply the database migrations:

```sh
$ python manage.py migrate
```

## Model Changes

After creating or modifying a model I use the commands:

```sh
$ python manage.py makemigrations
$ python manage.py migrate
```

To Run the server you need to start with the command:

```
$ python manage.py runserver
```

To Run the FrontEnd go to the directory `cd frontend` and run:

```
$ npm start
```

if it is the first time you will need to create a superUser to access the Admin

```
python manage.py createsuperuser
```


Don't forget to commit the changes to the migration files in `anchorages/migrations`.

## NPM Vulnerabilities

After installing dependencies, there may be a vulnerability, for example:

> 8 vulnerabilities (2 moderate, 6 high)

Using the command, you can attempt to resolve the issues:

```sh
$ npm audit fix
```
