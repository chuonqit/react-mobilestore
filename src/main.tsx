import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./stores";
import { Provider } from "react-redux";

ConfigProvider.config({
    theme: {
        primaryColor: "#cd1818",
    },
});

import "antd/dist/antd.variable.css";
import "swiper/css/bundle";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
    <React.Suspense fallback={null}>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.Suspense>,
    document.getElementById("root")
);
