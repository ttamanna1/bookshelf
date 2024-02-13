# bookshelf
The bookshelf app is a reading list tracker where users can create an account and keep a track of their reading lists by creating, editing, deleting a book entry. They can move their entries between three reading lists: wishlist, currently reading and finished. This was a solo project completed in one week.
## Deployment Link
[Live Deployment](https://bookshelf-project-5fec0e408021.herokuapp.com/)

## Technologies Used
- HTML
- CSS
- Sass
- React
- Python
- Django
- PostgreSQL
- TablePlus
- Insomnia
- Heroku

## Brief
- Build a full-stack application by making your own backend and your own front-end.
- Use a Python Django API using Django RESt framework to serve data from a Postgres database.
- Consume the API with a separate front-end built with React.
- Backend must have at least two models, multiple relationships and CRUD functionality.

Necessary deliverables:
- A working app hosted on the internet.
- A git  repository hosted on Github and frequent commits dating back to the very beginning of the project.
- A readme file.

## Planning
### Entity relationship diagram (ERD):
I created an ERD to map out the relationships between my models on my backend. My genres model has a many to many relationship where all the books can have multiple genres associated with them.

![Screenshot 2024-01-22 at 13 46 32](https://github.com/ttamanna1/bookshelf/assets/138875274/32e01c99-8097-41c9-a16d-468c4f49dcac)


### Wireframe:
I created a wireframe using Figma and drew out how I want the components on my app to look like. I knew I wanted to have three reading lists: Wishlist, Currently Reading and Finished. 

![Screenshot 2024-01-22 at 08 15 04](https://github.com/ttamanna1/bookshelf/assets/138875274/6ffc658c-b645-4a23-94a2-3fd2fdf80a66)
![Screenshot 2024-01-22 at 08 15 55](https://github.com/ttamanna1/bookshelf/assets/138875274/70e92a31-f575-4cb6-aafa-a49d57189e90)

Once I have decided the layout of my app, I chose a color theme:

![Screenshot 2024-01-22 at 08 19 46](https://github.com/ttamanna1/bookshelf/assets/138875274/1765a747-7212-45c8-a687-70b5887ebf84)

## Build Process
### Backend:
I worked on the backend first, defining my models and to enable user authentication.

![Screenshot 2024-01-22 at 09 14 54](https://github.com/ttamanna1/bookshelf/assets/138875274/79b68fa7-bf83-4dbb-95c3-196e8c5400a6)

My main Book model defines the fields I will have where the user can create and edit a book entry. I added a status field which will allow users to move book entries between ‘wishlist, ‘currently reading’ and ‘finished’. I have one many-to-many relationship with the ‘genres’ field where the user can select multiple genres for a book entry.

I was going to use Neon as the cloud server which will make my app slower because of the separate calls to the database whenever any fields are populated. Therefore, I used .prefetch_related() on my querysets to speed up the app by only making one call, reducing the need to query the database multiple times.

![Screenshot 2024-02-13 at 11 01 22](https://github.com/ttamanna1/bookshelf/assets/138875274/26dca753-3fbc-44fb-9400-9fb7e7202890)

I added password confirmation for my users. If passwords and password confirmation do not match when the user registers an account, registration will fail.

![Screenshot 2024-01-22 at 09 24 29](https://github.com/ttamanna1/bookshelf/assets/138875274/6cf08ef7-41be-433c-a9db-e3d5207a5493)

### Frontend:
I created the user registration and login forms and added user authentication on the frontend. I created a homepage where the user can signup or login.

![Screenshot 2024-02-13 at 11 03 45](https://github.com/ttamanna1/bookshelf/assets/138875274/e730dec0-a0a4-4224-ad12-5094b4b95529)

When the user logs in, they can navigate between the Wishlist, Currently Reading and Finished components. Users can add a book entry on any of these components and this will direct them to the create entry form. Once created, the book information component will be displayed. They can move a book entry between these components.

![Screenshot 2024-02-13 at 11 04 34](https://github.com/ttamanna1/bookshelf/assets/138875274/f5459715-3edd-4dc6-86ae-001349579e51)

I had a challenging issue when creating the create entry form. As I am using a many to many field with my genres field, I wanted the input to be submitted in the form of an array of integers, with the integers being the id of the genre, as tested in Insomnia. I created a handleGenres function which did achieve that as tested on the console.

![Screenshot 2024-02-07 at 08 55 33](https://github.com/ttamanna1/bookshelf/assets/138875274/94883378-2f54-438f-b289-7b8ed4770bb0)

However, when submitting the entry, it would fail and I would get a 400 bad request. I checked the Network tab in the dev tools of the webpage and the genre was being listed as a single string. In my form I also enabled a multi select feature for my genres, but even if I selected multiple genres, in the console it will display as an array of integers but the submission will fail and the Network tab has genres entered with only a single string. I tried researching why the error occurred by checking my backend, changing my handleGenres function, retesting in Insomnia and looking at other resources. I realized that the handlesGenres function is not the problem because it was displaying the results in the form I wanted in the console. 

I didn’t find the cause of the error or any possible solutions. When using AI, it always directed me to changing my backend but I didn’t think that was the problem. The problem was that the information submitted was not being sent in the correct format to the backend. 

I asked my instructional lead for some support and troubleshooting and explained what I had done so far. I was advised that the react-router-dom Form will submit the input values and not the state if I am using an action. Therefore, the information is not being sent to the backend in the correct format that I want. With this information, I changed my component to not use an action using useActionData hook and made the POST request directly in my component in the handleSubmit function. I changed my form from a react-router-dom Form to a HTML form with a multi select feature. I tested the outcome and my issue was resolved.

![Screenshot 2024-02-07 at 09 43 55](https://github.com/ttamanna1/bookshelf/assets/138875274/17902945-d989-4164-a066-a64d56148011)

I also used this concept in my edit entry component with a PUT request and tested to see if it works.

If the user wants to edit a book entry, they can click on the edit button which will take them to the edit component. The edit component pre-populates the fields of the selected book and the user can edit it as they wish. To do this I used the useEffect hook which makes a get request which is rendered by the book id. In the useEffect I set the form data to pre-populate the data of that book id. 

![Screenshot 2024-02-07 at 09 52 55](https://github.com/ttamanna1/bookshelf/assets/138875274/fc22311a-624d-4ba0-9d6c-36ac2d34807a)

This will take them to a component that provides information on the book and the user has the ability to edit the book. When the edit is submitted, the component directs to the single book component (specific book page).

![Screenshot 2024-02-13 at 11 08 59](https://github.com/ttamanna1/bookshelf/assets/138875274/4f2be69b-64af-469b-b936-9b6b836775ae)

I have added a light and dark theme to my app as an added feature.

![Screenshot 2024-02-13 at 11 10 20](https://github.com/ttamanna1/bookshelf/assets/138875274/c9432b2f-14f8-4cda-be71-4f2992e3e5dd)

## Challenges
I initially had trouble targeting the ‘genres’ field for my create and edit components.  During testing in Insomnia, the genres field requires an array of integers and I found it difficult to enable that in the frontend with the addition of a multi-select function. After troubleshooting, trying various methods and using the console to test, I managed to enter the data in the correct format.

Towards the end of my project, I wanted to include an error message if the user enters incorrect details on my registration (signup) and login pages. I added what I believed were the necessary error messages in a p tag. My backend already had authentication set up but the error messages wouldn’t display and the page would just refresh. I decided to try to implement something similar to the issue I had with my create entry component as I believed that it may be a similar issue. So I removed the action and used the HTML form. In my handleSubmit function for my registration page, I used the POST request with conditions to check if passwords match or if username already exists. For my login page, I checked for valid username. This resolved my issue and the error message would display if incorrect details were displayed.

## Wins
- Resolved the challenge faced with the genres field in the create entry component.
- Resolved registration and login error message display.
- Utilized the status field in my Book model.
- Added a bonus light/dark theme feature.

## Improvements
- For the error message displayed on the registration (signup) and login pages if the user enters incorrect details, I could improve the UI by using a popup or a toast instead of a p tag.
- I could build my app where there is a component with a library of books and the users can search and select the books from this page to add to their wishlist, currently reading or finished pages.
- I could add a feature where the user sets an annual reading goal and a progress bar to visualize how far they are in achieving that goal.



