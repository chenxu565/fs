# Full Stack Part3 Exercise

## Introduction
This project is the third part of the Full Stack exercise series, focusing on deploying a web application to Fly.io. It integrates the frontend developed in Part 2 with a backend, providing a complete web application deployment.

## TL;DR
Access the live application here: https://part3-v2.fly.dev/

## Purpose
The primary goal of this part is to deploy the entire application on Fly.io, demonstrating the process of deploying a full-stack application in a production environment. Fly.io was chosen for its ease of use, scalability, and performance benefits.

## Prerequisites
Before starting, ensure the following are installed:
- Node.js (version 16 or higher)
- npm (version 8 or higher)

## Steps
### 1. Preparing the Frontend
First, compile the frontend from Part 2:
```bash
cd part2/phonebook
npm run build
cp -r build /path/to/part3
```

This will update the file structure of part3 as follows:
```
.
├── .dockerignore
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── README.md
├── build           # Frontend build copied here
├── favicon.ico
├── fly.toml
├── index.js
├── models
├── mongo.js
├── node_modules
├── package-lock.json
├── package.json
└── requests
```
### 2. Testing locally
To test locally, create a .env file at the root with the content similar to the following (replace `{password}` with the MongoDB password):
```
# .env file content
MONGODB_URI=mongodb+srv://fullstack:{password}@cluster0.mnfuhu9.mongodb.net/phonebook?retryWrites=true&w=majority
PORT=3001
```
Run the app using `npm start`, and it will be accessible at `http://localhost:3001`

### 3. Deployment to fly.io

Navigate to the root of `part3` and log in to Fly.io:
```
fly login
fly launch
```

Modify the configuration as needed, such as the `name`. This process will generate new files at the root, like `Dockerfile`.

Update `.dockerignore` to include the `build` folder as it's necessary for the deployment. Note that the `.dockerignore` file is also stored in the repository for reference and consistency across setups.

And modify the `fly.toml` according to the one on the repo.

Set the secret on Fly.io (replace {password} with the actual password):
```
fly secrets set MONGODB_URI="mongodb+srv://fullstack:{password}@cluster0.mnfuhu9.mongodb.net/phonebook?retryWrites=true&w=majority"
```

Deploy to fly.io using:
```
fly deploy
```
or alternatively:
```
flyctl deploy
```

This will create a Docker image, upload it to Fly.io, and deploy the application online.

Then the website is online.

## Security Considerations
Remember to keep the MongoDB URI and other sensitive data secure, especially in the .env file and when setting Fly.io secrets. Never store them onto a repository.

## Final Steps

Once deployed, one should be able to access the application at the provided Fly.io URL. Verify that all functionalities are working as expected.
