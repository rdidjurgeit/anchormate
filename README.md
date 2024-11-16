# README AnchorMate

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

Create a `.env` file in the root of the project and setup the following variables:

- `REACT_APP_GOOGLE_MAPS_API_KEY`: get from Google Cloud API configuration

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
## Deploying to production

The application will be deployed to Heroku, where the following needs to be configured:

- Create an app
- Set `SECRET_KEY` to a random value with 64 characters
- Set `DATABASE_URL` to the Code Institute PostgreSQL URL 
- Set `API_BASE_URL` to `/api`
- Configure integration with GitHub and enable automatic deployments

Now each time a push to GitHub will trigger deployment. 

On Heroku use the option More > Run console to apply migrations with: 

```
$ python manage.py migrate
```

You can also create a super user:

```
$ python manage.py createsuperuser
```
