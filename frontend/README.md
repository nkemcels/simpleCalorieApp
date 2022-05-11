# Simple Calorie App Frontend (React-Typescript)

## Main tech stack/components
* **[React](https://facebook.github.io/react/)** (17.x)
* **[Webpack](https://webpack.js.org/)** (5.x)
* **[Typescript](https://www.typescriptlang.org/)** (4.x)
* **[Redux](https://redux.js.org)** (4.x)
* **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** ([React Hot Loader](https://github.com/gaearon/react-hot-loader))
* Production build script (Webpack)
* Image loading/minification ([Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader))
* [SASS](http://sass-lang.com/) support
* Code linting ([ESLint](https://github.com/eslint/eslint)) and formatting ([Prettier](https://github.com/prettier/prettier))
* Test framework ([Jest](https://facebook.github.io/jest/))

### Installing dependencies
Install the dependencies by running:
```bash
yarn install
```

### Starting the frontend for development
Once the dependencies are installed, start the app by running:

```bash
yarn start
```

This starts the development server by default on port `3000`.


### Generating a production build
Run the following command to generate a production build of the project.
```bash
yarn build:prod
```
The generated files will be located in the `dist/` folder of the `frontend/` root directory.


### File structuring for the frontend

-   `src/index.tsx` Entry point. Mounts the react app to the dom.
  
-   `src/routes` Defines the entry points for each route
    -   `<domain>/#/auth/signup` => sign up route
    -   `<domain>/#/auth/login` => login route
    -   `<domain>/#/home/dashboard` => app route. Only accessible after a successful authentication
  
-   `src/redux` Defines all actions, reducers and store configurations for the app's state management
-   `src/components` Defines global stateless components
-   `src/containers` Defines global HOCs and stateful components
-   `src/constants` Defines app constants like api urls, app route paths etc
-   `src/hooks` Defines custom react hooks
-   `src/layouts` Defines the layouts that are used by `pages` or `screen` views.
