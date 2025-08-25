# Blog App (Django + React)

A full-stack blog application built with Django (backend) and React (frontend). Users can register, login, create posts, edit posts, and delete posts.

---

## Setup Instructions

### Backend (Django)

Create a virtual environment (if not already created):  
`python -m venv venv`

Activate the environment:  
Windows: `venv\Scripts\activate`  
macOS/Linux: `source venv/bin/activate`

Install dependencies:  
`pip install -r requirements.txt`

Database Setup
This project uses MS SQL Server with a DSN (Data Source Name) for the connection.
Ensure you have ODBC Driver installed.
Create a DSN named BlogDSN pointing to your SQL Server instance.
The backend is currently configured to use the DSN in settings.py.

Apply migrations:  
`python manage.py makemigrations`  
`python manage.py migrate`

Run the backend server:  
`python manage.py runserver`

---

### Frontend (React)

Navigate to frontend folder: `cd blog_project/blog-frontend`

Install dependencies: `npm install`

Start development server: `npm start`


---
###Test API with Postman

A Postman collection is included (BlogApp.Django Blog App API.postman_collection.json).

Import it into Postman and test endpoints after running the backend.

It includes sample requests for:

Login
Register
Create Post
Edit Post
List Posts
Get Post Detail

###Create a User

Users can be created in two ways:

From the frontend:
- Navigate to the Register page (/register) and fill in username and password.
- From Postman / API. (refer to collection for the body examole and endpint)

After registering, you can log in via the frontend or using Postman.

---
### Environment Variables

This project does not currently use environment variables.
