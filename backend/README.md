# Simple Calorie App Backend

The main technologies and frameworks involved in the backend are:

-   `Node.js`
-   `MongoDB` for database
-   `Mongoose` as ODM for MongoDB
-   `Express.js` framework for REST APIs
-   `winston` for logging and
-   `socket.io` for realtime updates and notifications.

# IMPORTANT!!!
Before you begin installing dependencies, add a `.env` file to the root directory of the backend. i.e in `backend/.env`.

Once that is done, add the following environment variables to that `.env` file.

```js
// choose the port you like 
PORT=8080 

// make sure this points to your mongodb database
DATABASE_URL="mongodb://localhost:27017/calorie_app"    

// will be used to sign jwt tokens. set any string you like.
APP_JWT_SECRET="any-secured-string"  

//
NODE_ENV=development
```

### Dev requirements

-   `MongoDB` **4.4+**
-   `Node.js` **12+**

### Installing dependencies
Install the dependencies by running:
```bash
yarn install
```

### Starting the backend for development
Once the dependencies are installed, start the app by running:

```bash
yarn start
```

This starts the development server by default on port `8080`. You can change this from the `.env`.


### Starting the backend for production

```bash
yarn start:prod
```
This will spin up a new `pm2` instance and run the app in it. So make sure to have `pm2` installed globally.

### File structuring for the backend

-   `src/index.ts` Entry point. Initiates the connection to mongoDB and starts the api server
  
-   `src/app.ts` Configures the REST APIs.
  
-   `src/errorTypes` Defines all the possible error types that could be thrown by the app.
 
-   `src/middlewares` Defines custom express middlewares.

-   `src/models` Defines the database models

-   `src/utils` Defines global utilities used in the app

-   `src/services` REST API calls are grouped into services, with each service performing only specific and predictable operations. Here, a service typically is associated with operations involving a single database model.

Each service has four parts, A `manager`, a `controller`, `routes` and `validators`.

`routes` define the APIs that should be exposed. 

`validators` ensure that the properties required to access a given route are correct.

`controller` takes care of receiving the request and invoking the appropriate function calls on the `managers` to perform the request task.


