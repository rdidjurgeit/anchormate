# README AnchorMate


### View the live project [here.](https://anchoragemate-783dbb8d670b.herokuapp.com/)

This platform is is a community-driven platform designed to be the ultimate resource for sailors seeking the best anchorages worldwide. Whether you're navigating familiar waters or exploring new territories, Anchormate provides detailed insights on anchorages shared by sailors themselves. Users can browse and contribute essential information, including location details, depth, seabed type, and personal experiences, creating a rich database of trusted, real-world knowledge. Anchormate is not just a guide but a collaborative tool where the global sailing community connects to make every voyage safer and more enjoyable,no matter where the journey takes you 

## User Experience (UX)

- #### User Goals

    1. My wish is to create a community with safe anchorages so sailor can have more information according to anchorages.

- #### Developers Goals

    1. I want the user to be able to the anchorage and check the map where it is.

- #### Design

    1. I wanted to keep the Design and color simples since the man tool was the map 


## Features

-    **Anchorages** 
        - Buttons allow the user to Create Anchorages where after Create it will show in the map.

-    **Bookmarks**
        - Allows for the user to save the anchorages and in the bookmark will be the save ones.

## Technologies Used

- #### Languages

    * [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
    * [CSS3](https://en.wikipedia.org/wiki/CSS)
    * [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- #### Frameworks, Libraries and Other Tools

    * [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction)
        - Used to style webpage and ensure it was fully reponsive

    * [JQuery](https://jquery.com)
        - I used jQuery as the primary way to select the html elements in my Javascript functions. It also helped me handle user interation with the page in the form of event methods.

    * [Github](https://github.com/)
        -  Was used to store files of the project that I had pushed using Git & Gitpod

    * [Font Awesome](https://fontawesome.com/)   
        - Site used to soruce icons for the webpage.

## Deployment

### GitHub Pages

The project was deployed to GitHub Pages using the following steps...

1. Log in to GitHub and locate the [GitHub Repository]

2. At the top right of the Repository (not top of page), locate the "Code" and use the HTTPS to clone for local Deployment .
    - Alternatively Click [Here](https://github.com/rdidjurgeit/anchormate.git) 
    - Following the steps for your preference .


## Getting started

### Making a Local Clone

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/rdidjurgeit/anchormate)
2. Under the repository name, click the "Code" button and a dropdown menu will appear.
3. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
4. Open Git Bash
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type `git clone`, and then paste the URL you copied in Step 3.

Click [Here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-to-github-desktop)

- This project requires Python 3 and Node v20.

- Install the project dependencies:

```sh
# In the root of the project
$ pip install -r requirements.txt
# In the frontend/ directory
$ npm install
```

- When setting it up for the first time, apply the database migrations:

```sh
$ python manage.py migrate
```

- Create a `.env` file in the root of the project and setup the following variables:

- `REACT_APP_GOOGLE_MAPS_API_KEY`: get from Google Cloud API configuration

## Model Changes

- After creating or modifying a model I use the commands:

```sh
$ python manage.py makemigrations
$ python manage.py migrate
```

- To Run the server you need to start with the command:

```
$ python manage.py runserver
```

- To Run the FrontEnd go to the directory `cd frontend` and run:

```
$ npm start
```

- if it is the first time you will need to create a superUser to access the Admin

```
python manage.py createsuperuser
```

- Don't forget to commit the changes to the migration files in `anchorages/migrations`.

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

## Credits

### Code

-  Most off the Code where made using some variation off standar practices and common patterns from Django REST Framework, React, and JavScrips.

- Some of the ideas where take from the walkthrough from DjangoFrameWork and project moments examples from Code Institute

#### Django

- Official Documentation: https://www.djangoproject.com/

- Django REST Framework: https://www.django-rest-framework.org/

#### React

- Official React Documentation: https://reactjs.org/

- React Router: https://reactrouter.com/

#### JavaScript

- MDN Web Docs for JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript

- ECMAScript Standards (JavaScript Specification): https://tc39.es/

##### Other Resources for Best Practices

- JavaScript and React Best Practices:

- MDN Web Docs

#### React Developer Blog

- Django Best Practices:
- Django Documentation Tutorials
- Django REST Framework API Guide

-   [Bootstrap 4](https://getbootstrap.com/docs/4.4/getting-started/introduction/) Library and Documentation was used throughout the html file to make site responsive on all devices.

### Content

-   All content was written by the developer.

### Media

-  All Icons used were taken from Font Awesome.

### README

- The README was take from exemplo from user reidycolm student from Code Institute

### Anchorage Data

- Looking for anchorage to populate i found the app from garmin and some of the data belong to [activecaptain.garmin.com](https://activecaptain.garmin.com/)