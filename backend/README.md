## MyGYM Backend

The main technologies and frameworks involved in the backend are:

-   `Node.js`
-   `MongoDB` for database
-   `Mongoose` as ODM for MongoDB
-   `Express.js` framework for REST APIs
-   `winston` for logging and
-   `socket.io` for realtime updates and notifications.

### Dev requirements

-   `MongoDB` **4.4+**
-   `Node.js` **12+**

### Installing dependencies

```bash
yarn install
```

### Starting the backend for development

```bash
yarn dev
```

This starts the development server by default on port `8082`. You can change this from the `config.json` file in the project's root directory.

### Starting the backend for production

```bash
yarn start:prod
```
