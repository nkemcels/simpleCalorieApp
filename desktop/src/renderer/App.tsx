import * as React from "react";
import { hot } from "react-hot-loader";

import { getAppStore } from "./redux/store";

import "./assets/styles/App.global.scss";
import "./assets/styles/App.global.less";
import AppRoutes from "./routes";
import { Provider } from "react-redux";

const store = getAppStore();

const App = () => {
    return (
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    );
};

declare let module: Record<string, unknown>;

export default hot(module)(App);
