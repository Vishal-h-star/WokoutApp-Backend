M : MongoDb (Data base) Nosql
E : Express (Backend)
R : Reactjs (Frontend)
N : Nodejs (Backend)

## Frontend (Browser / client sied ) Backend(server) Database

React app Express + Nodejs MongoDB

## Can we directly connect our Database to the react app ?

------> Yes technically, but we should NEVER do it.

# 🚨 Anyone can read/write/delete entire database.

# 🚨 No authentication / authorization layer.

# 🚨 Hackers can inject malicious queries.

# 🚨 Massive security risk — Our database will be destroyed within minutes

## Then we to use Backend (sever) ?

# 📌 Frontend never touches database directly

# 📌 Backend communicates securely using Mongoose

# 📌 Backend checks user authentication & permissions

# 📌 Only allowed operations are performed

😁 In short Backend(server) keeps our data secure

## Backend:

-- npm init -y
-- npm install express / npm i express
-- npm i nodempn -D \__ saving it as devdependency
|_ npm run dev to start

-- npm i mongoose

## ❓ Why PORT is in uppercase?

Because of standard practice:
Name style Meaning
PORT A constant / configuration value
port A normal variable
Port Class or Constructor

## Api endpoints for CRUD operations

GET /Workouts ----> Get all the workout docs
POST /Workouts ----> Create a new workout docs
GET /workouts/:id ----> Get a single workout docs by its id
DELETE /workouts/:id ----> delete a single workout docs by its id
PATCH /workouts/:id ----> Updateding a single workout docs

## For password hasing bcrypt

npm i bcrypt

## To validate email and password

npm i validator

## (JWT) Json web Token

npm i jsonwebtoken
