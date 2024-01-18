# Single Page Application: BlogApp

## Overview
This project is a single-page application (SPA) for a blogging platform, structured into two main directories: `frontend` and `backend`. The frontend is a React application, while the backend is built with Node.js and Express. This README outlines the steps to build the application and prepare it for deployment.

## Frontend

### Building the Frontend

1. Navigate to the `frontend` directory:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Build the application:

```
npm run build
```

This will create a `build` directory inside `frontend`, containing the compiled static files.

### Moving Frontend Build to Backend
1. Copy the contents of the `frontend/build` directory to `backend/build`. This can be done with the following command from the root of the project:

```
cp -r frontend/build/* backend/build/
```



## Backend

### Setting Up the Backend
1. Navigate to the `backend` directory:
```
cd backend
```
2. Install dependencies:
```
npm install
```

### Running the Application
1. Start the backend server:
```
npm start
```
The server will start and serve the frontend static files from the `backend/build` directory.

2. Access the application by navigating to `http://localhost:3003` in the web browser (replace `3003` with other port if different).

## Additional Notes
- Make sure to configure the MongoDB URI and other environment variables as needed in the backend.
- For development, ensure proper proxy settings are configured in the frontend for API calls to the backend.



