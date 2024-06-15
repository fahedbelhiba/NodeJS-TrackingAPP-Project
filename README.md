## Trucks Tracking Project with Node.js

### Description
This project is aimed at developing a truck tracking system using Node.js. It utilizes various dependencies to achieve functionality such as user authentication, data validation, real-time communication, and database management.

### Dependencies

- **bcrypt** (^5.1.1): Library for hashing passwords securely.
- **cookie-parser** (^1.4.6): Middleware for parsing cookies.
- **express** (^4.19.2): Fast, unopinionated, minimalist web framework for Node.js.
- **express-http-to-https** (^1.1.4): Middleware to redirect HTTP requests to HTTPS.
- **express-validator** (^7.1.0): Library for validating and sanitizing data in Express.
- **jsonwebtoken** (^9.0.2): Implementation of JSON Web Tokens (JWT) for authentication.
- **mongoose** (^8.4.1): MongoDB object modeling tool designed to work in an asynchronous environment.
- **socket.io** (^4.7.5): Library for real-time, bidirectional and event-based communication.
- **socket.io-client** (^4.7.5): Client library for socket.io to enable real-time communication from the client side.

### Development Dependencies

- **nodemon** (^3.1.2): Utility that automatically restarts the server when changes are detected in the source code.

> [!TIP]
>
> To install those dependencies use `npm install [dependencie]`



otherwise you can find the project on my github click link: [https://github.com/fahedbelhiba/NodeJS-TrackingAPP-Project]()

> [!NOTE]
>
> if you clone the project from my github use `npm install` to automatically install all the dependencies required for the project 


### Generating Private and Public Keys

 **Generate Private Key**: Use `openssl` to generate a private key (`private.key`) encrypted with AES256:
 using   ```powershell```

```
openssl genpkey -algorithm RSA -out private.key -pubout -outform PEM
```

> [!CAUTION]
>
> for this you need to have openssl installed on your computer

or you can use a online generator and paste the `private`and `public` keys in files 

   


### Scripts

- **start**: Uses nodemon to start the server (server.js)   

> [!WARNING]
>
> in this project i'm working with ecmascript6 (ES6)   so make sure that you have `"type":"module"` in your `package.json` file

  
### Setting Up MongoDB Connection with Mongoose

​	in your **database/index.js** file make sure that 

```
const mongoUri = "mongodb://localhost:27017/project_npm";
```

​	is matching the serving from your mongodb  database 





### API Endpoints

#### Authentication

- **POST /users/adduser/**
  
  - Registers a new user.
  
  - Request body (user):
    ```json
    {
      "email": "belhibaffaheds@outlook.fr",
      "password": "password"
    }
    ```
    - Request body (admin):
    ```json
    {
      "email": "belhibaffaheds@outlook.fr",
      "password": "password",
      "role": "admin"
    }
    ```
    
  - Response:
  
    ```json
    {
        "message": "agent created",
        "user": {
            "email": "belhibaffaheds@outlook.fr",
            "_id": "666d73b6fe7dc026a60c009a"
    }
    ```
    > [!IMPORTANT]
    >
    > this will store the new user to `mongo`database and by default `role` : "**user**"
  
    
  
      - Error Response (400) => validation error:
  
    ```json
    {"message": "This mail already exists"} "or"
    {"message": "Please provide a valid email"} "or"
    {"message": "Password must be at least 6 characters long"}
    ```
  
  - **POST /users/login**
  
  - Request body:
    ```json
    {
     "email": "example@vvkdf.com",
      "password": "password"
    }
    ```
    
  - Response:
    ```json
    {
       "message": "agent logged in"
    }
    ```

> [!IMPORTANT]
>
> this will store the `token` that i named `authToken` to the `cookies` 

  - **POST /users/logout** 
  
  - Request body:
    ```json
    {
     "email": "example@vvkdf.com",
      "password": "password"
    }
    ```
    
  - Response:
    ```json
    {
       "message": "agent logged in"
    }
    ```

> [!IMPORTANT]
>
> this will store the `token` that i named `authToken` to the `cookies` 



- **GET /users/allusers  (Only Admin)** 
  
  - Retrieves all users.
  
  - Response:
    ```json
     {
            "_id": "66642bf4a9f2699d05359b34",
            "email": "theredddask@gmail.com",
            "password": "$2b$10$BduUdrnC31zZdUVSv9HJzuuh2iiHmu7agUh45buLBnaCbK7Er7APy",
            "role": "admin",
        },
    ```
  
- **POST /api/trucks**
  
  - Creates a new truck.
  - Request body:
    ```json
    {
      "name": "New Truck",
      "status": "active"
    }
    ```
  - Requires JWT token for authentication.
  - Response:
    ```json
    {
      "id": 3,
      "name": "New Truck",
      "status": "active"
    }
    ```

#### Real-Time Tracking

- **POST /vehicles/monitoring-trucks/**
  - Updates the location of a truck in real-time.
  - Requires JWT token for authentication.

### Usage with Postman

1. **Register a User**: Send a POST request to `http://localhost:5000/users/adduser` with the JSON body specified above.

2. **Login**: Obtain a JWT token by sending a POST request to `http://localhost:5000/users/login` with the JSON body specified above.

3. **Retrive trucks in realtime**: Obtain a JWT token by sending a GET request to `https://localhost:5000/vehicles/monitoring-trucks/` with the JSON body specified above.



### Author

Fahd Belhiba
