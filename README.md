# README AnchorMate

## View the live project [here.](https://anchoragemate-783dbb8d670b.herokuapp.com/)

This platform is a community-driven platform designed to be the ultimate resource for sailors seeking the best anchorages worldwide. Whether you're navigating familiar waters or exploring new territories, Anchormate provides detailed insights on anchorages shared by sailors themselves. Users can browse and contribute essential information, including location details, depth, seabed type, and personal experiences, creating a rich database of trusted, real-world knowledge. Anchormate is not just a guide but a collaborative tool where the global sailing community connects to make every voyage safer and more enjoyable, no matter where the journey takes you.

## Wireframe

![wireframa](/img/wireframe.png)

## User Experience (UX)

- ### User Goals
  
 I wish to create a community with safe anchorages so sailors can have more information about anchorages.

1. **Access a database of safe anchorages** for quick location and details.
2. **Browse anchorages without logging in**, but only **create/edit** anchorages when logged in.
3. **Visualize anchorages on a map** for intuitive navigation.

- ### Developers Goals

 I want the user to access the anchorage and check the map where it is.

1. Provide a **user-friendly** interface with minimal clutter focusing on the map.
2. Ensure **permission checks** that let guests view but require login for creation/editing.
3. Maintain a **secure**, **scalable** system using Django and React.

### User Stories & Acceptance Criteria
1. **As a user, I can create an account**  
   - **Acceptance Criteria**:  
     - “Create Account” link directs to a registration form.  
     - Form includes fields for username, email, and password.  
     - Successful submission creates a new user account and redirects to the Login page.  
   - **TODO**:  
     - Create a "Create Account" form template.  
     - Set up registration logic to save new users.  
     - Test redirects after registration to ensure they work as expected.

2. **As a user, I can create and edit anchorages**  
   - **Acceptance Criteria**:  
     - Form is intuitive and easy to use.  
     - Changes are saved to the back-end and displayed on the map.  
   - **TODO**:  
     - Create Form for “Add Anchorage.”  
     - Enable “Edit Anchorage” functionality.  
     - Send and save data to back-end.

3. **As a guest user, I can see the anchorages but not create or edit**  
   - **Acceptance Criteria**:  
     - Anchorage list visible without login.  
     - Create/Edit not possible without login.  
   - **TODO**:  
     - Confirm the app enforces permission checks for guest vs. logged-in users.

4. **As an admin, I can view anchorage details in the list view**  
   - **Acceptance Criteria**:  
     - Anchorage info is clearly displayed.  
     - Only owners or admin can edit/delete.  
   - **TODO**:  
     - Ensure admin panel shows extended info.  
     - Verify staff/owner permissions.

5. **As a user, I can see which page I’m on by the highlighted navigation link**  
   - **Acceptance Criteria**:  
     - The active page link is highlighted in the nav bar.  
     - Distinct and consistent styling across pages.  
     - Active state updates correctly when navigating.  
   - **TODO**:  
     - Add CSS styles for the active nav link.  
     - Verify correct link is highlighted on each page.

6. **As a user, I can view a Home page**  
   - **Acceptance Criteria**:  
     - Accessible from the navigation bar.  
     - Displays a welcome message or brief description.  
     - Layout is consistent with overall site style.  
   - **TODO**:  
     - Design a simple layout for the Home page.  
     - Add a welcome message.  
     - Review consistency with site.

7. **As a user, I can see a map with anchorages**  
   - **Acceptance Criteria**:  
     - An interactive map is displayed.  
     - Anchorage coordinates are plotted accurately.  
   - **TODO**:  
     - Integrate Google Maps (or alternative) with an API key.  
     - Display anchorages by their lat/long.

---

## Features

- **Anchorages**  
  - List and detail views.  
  - Logged-in users can add new anchorages; owners can edit or delete.  
  - Coordinates are mapped for visual reference.

- **Bookmarks**  
  - (If implemented) Users can bookmark favorite anchorages.  
  - Bookmark icon (`fa-anchor`) in navbar to indicate the feature.

- **Authentication**  
  - Registration, login, logout.  
  - Permission checks for create/edit.

---

## Design

1. **Minimalist Layout**  
   - Focus on the map.  
   - Light color scheme.

2. **Responsive UI**  
   - Uses **Bootstrap** for grid and styling.  
   - Tested across various screen sizes.

---

## Technologies Used

### Languages

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
- [CSS3](https://en.wikipedia.org/wiki/CSS)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Frameworks, Libraries, and Other Tools

- [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction)
- Used to style webpage and ensure it was fully responsive

- [JQuery](https://jquery.com)
- I used jQuery as the primary way to select the HTML elements in my Javascript functions. It also helped me handle user interaction with the page in the form of event methods.

- [Github](https://github.com/)
-  Was used to store files of the project that I had pushed using Git & Gitpod

- [Font Awesome](https://fontawesome.com/)
- Site used to source icons for the webpage.

## Deployment

### GitHub Pages

The project was deployed to GitHub Pages using the following steps...

1. Log in to GitHub and locate the [GitHub Repository]

2. At the top right of the Repository (not the top of the page), locate the "Code" and use HTTPS to clone for local Deployment.
    - Alternatively, Click [Here](https://github.com/rdidjurgeit/anchormate.git)
    - Following the steps for your preference.
  
### Heroku (for back-end hosting)

1. Create a new Heroku app.  
2. Under **Settings**, set config vars (`SECRET_KEY`, `DATABASE_URL`, etc.).  
3. Connect your GitHub repository under **Deploy**.  
4. Enable **automatic deploys** or do manual deploys.  
5. After deployment, run migrations:

 ```bash
   Heroku runs Python manage.py migrate

## Getting started

### Making a Local Clone

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/rdidjurgeit/anchormate)
2. Under the repository name, click the "Code" button and a dropdown menu will appear.
3. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
4. Open Git Bash
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type `git clone`, and then paste the URL you copied in Step 3.

Click [Here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-to-github-desktop)

#### Dependencie & Setup

- Python 3.8+
- Node v20+(for the React front-end)
- Pip

Install the project dependencies:

```sh
# At the root of the project
$ pip install -r requirements.txt
# In the frontend/ directory
$ npm install
```

- When setting it up for the first time, apply the database migrations:

```sh
python manage.py make migrations
python manage.py migrate
```

- Create a `.env` file in the root of the project and set the following variables:

- `REACT_APP_GOOGLE_MAPS_API_KEY`: get from Google Cloud API configuration

### Model Changes

- After creating or modifying a model I use the commands:

```sh
python manage.py make migrations
python manage.py migrate
```

- To Run the server you need to start with the command:

```
python manage.py runserver
```

- To Run the FrontEnd go to the directory `cd frontend` and run:

```
npm start
```

- if it is the first time you will need to create a superUser to access the Admin

```
python manage.py createsuperuser
```

- Don't forget to commit the changes to the migration files in `anchorages/migrations`.

### NPM Vulnerabilities

After installing dependencies, there may be a vulnerability, for example:

> 8 vulnerabilities (2 moderate, 6 high)

Using the command, you can attempt to resolve the issues:

```sh
npm audit fix
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
python manage.py migrate
```

You can also create a super user:

```
python manage.py createsuperuser
```

## Testing

In this section, we describe both **manual** and **automated** testing strategies for AnchorMate to ensure reliability, correctness, and a smooth user experience.

---

### Manual Testing

1. **Navigation Testing**  

- **Objective**: Verify that all links and navigation items lead to the correct pages.  
- **Steps**:  
  1. Click on each navbar link (e.g., Home, Anchorages, Bookmarks, etc.).  
  2. Check that you land on the correct page.  
  3. Confirm the “active link” style is applied to the currently visible page.  

1. **User Registration**  
   - **Objective**: Ensure that new users can create an account successfully.  
   - **Steps**:  
     1. Go to the “Create Account” link/form.  
     2. Enter valid details (username, email, password).  
     3. Submit and verify you are redirected to Login.  
     4. Enter invalid data (e.g., mismatched passwords) to confirm error handling.

2. **Login & Logout**  
   - **Objective**: Validate secure login and logout flow.  
   - **Steps**:  
     1. Login with valid credentials → Expect successful authentication and redirect to Anchorages or user dashboard.  
     2. Log out → Verify the user is redirected to the login page (or home page) and can no longer create/edit anchorages.  
     3. Attempt login with invalid credentials → Expect an error message.

3. **Anchorage Creation & Editing**  
   - **Objective**: Check if a user can create new anchorages and edit existing ones.  
   - **Steps**:  
     1. Log in as a regular user.  
     2. Click “Add Anchorage,” fill out the form, and submit.  
     3. Confirm the new anchorage appears in the list and on the map.  
     4. Attempt to edit an anchorage you own → Changes should be saved.
     5. Attempt to edit someone else’s anchorage → Expect permission denied or no edit option.

4. **Map Display**  
   - **Objective**: Ensure anchorages are displayed correctly on the map.  
   - **Steps**:  
     1. Open the anchorages page containing the map.  
     2. Verify each anchorage is plotted by its coordinates.  
     3. Check that you can zoom, pan, and interact with map markers (if implemented).

5. **Guest Access**  
   - **Objective**: Confirm a guest (not logged in) can only view anchorages.  
   - **Steps**:  
     1. Log out and revisit the anchorages page.  
     2. Confirm you can still see a list of anchorages and the map.  
     3. Confirm “Add Anchorage” or “Edit” options are hidden or disabled for guests.

6. **Bookmarks**  
   - **Objective**: Validate users can bookmark anchorages.  
   - **Steps**:  
     1. Log in as a user.  
     2. Click the bookmark icon next to an anchorage.  
     3. Check a “Bookmarks” page or section to ensure it appears in the user’s saved list.  
     4. Click again to remove the bookmark and verify it is removed from the list.

---

### HTML/CSS Validation

- **HTML**:  
  - Use the [W3C Markup Validation Service](https://validator.w3.org/) to validate your HTML files.  
  - Address any errors or warnings that may affect structure or semantics.

- **CSS**:  
  - Use the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) to check for CSS errors or non-standard styles.  
  - Ensure the layout is responsive and consistent across multiple browsers.

---

### JavaScript Testing

- **Console Checks**:  
  - Open DevTools (Chrome, Firefox, etc.) while navigating the site.  
  - Ensure no major errors or warnings are logged.  

- **Form Validations**:  
  - Attempt to submit forms (e.g., Create Account, Add Anchorage) with empty or invalid fields.  
  - Confirm custom or default error messages appear.  

- **Map Interactions**:  
  - Verify map markers are clickable (if implemented).  
  - Check that info windows or pop-ups display the correct anchorage details.

---

### Python & PEP8 Compliance

- **PEP8 Style**:  
  - Use [PEP8CI](https://pep8ci.herokuapp.com/), Flake8, or Black to lint your `.py` files.  
  - Common issues: line length, missing whitespace, incorrect indentation.

- **Manual Code Review**:  
  - Ensure views, models, and serializers follow Django REST Framework best practices.  
  - Check consistent naming conventions and docstrings.

---

### Automated Testing

1. **Django Tests**  
   - Run tests with:

 ```bash
     python manage.py test
 ```

   - Typical test coverage includes:  
     - Model creation and validation  
     - CRUD endpoints (list, create, retrieve, update, delete)  
     - Permission checks (ensuring only owners or admins can edit)

---

### Known Issues & Future Enhancements

- **Bookmark Icon Clarity**: Some users may not realize the anchor icon is for bookmarking. Plan to add tooltips or labels.  
- **Map Performance**: On large datasets, consider clustering or optimized loading.  
- **Accessibility**: Review ARIA attributes and color contrast for improved accessibility compliance.

---

**By conducting both manual and automated tests, addressing any errors or usability issues, and following code style guidelines, AnchorMate strives to deliver a robust and user-friendly experience for all sailors seeking safe anchorages.**

## Credits

### Code

- **Django Documentation**  
 [https://docs.djangoproject.com/](https://docs.djangoproject.com/)  
 Used as a reference for Django views, models, and configuration.

- **Django REST Framework**  
 [https://www.django-rest-framework.org/](https://www.django-rest-framework.org/)  
 Provided guidelines on creating RESTful endpoints and serializers.

- **React**  
 [https://reactjs.org/](https://reactjs.org/)  
 Used for building interactive front-end components and managing state.

- **Bootstrap Docs**  
 [https://getbootstrap.com/](https://getbootstrap.com/)  
 Used for responsive layouts, grid systems, and pre-built UI components.

### Content

- **All written content** created by the developer.  
- Some logic and patterns derived from Code Institute walkthroughs and best practices.

### Media

- **Icons**: [Font Awesome](https://fontawesome.com/)  
 Used for iconography throughout the site, such as the anchor bookmark icon.

- **Maps**: [Openstreetmap](https://www.openstreetmap.org/copyright)  
 Used for displaying anchorages on an interactive map (or any alternative mapping service if applicable).

#### Other Resources for Best Practices

- JavaScript and React Best Practices:

- MDN Web Docs

#### React Developer Blog

- Django Best Practices:
- Django Documentation Tutorials
- Django REST Framework API Guide

- [Bootstrap 4](https://getbootstrap.com/docs/4.4/getting-started/introduction/) Library and Documentation were used throughout the HTML file to make the site responsive on all devices.

### README

- The README was taken from exemplo from user reidycolm student from Code Institute

### Anchorage Data

- Looking for anchorage to populate I found the app from Garmin and some of the data belong to [activecaptain.garmin.com](https://activecaptain.garmin.com/)
