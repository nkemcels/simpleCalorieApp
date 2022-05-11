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

Once that is done, add the following environment variables

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

```bash
yarn install
```

### Starting the backend for development

```bash
yarn start
```

This starts the development server by default on port `8080`. You can change this from the `.env`.


### Starting the backend for production

```bash
yarn start:prod
```
This will spin up a new `pm2` instance and run the app in it. So make sure to have `pm2` installed globally.