
import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "App";
import './styles/app-base.css';
import './styles/app-components.css';
import 'react-toastify/dist/ReactToastify.css';
import "@progress/kendo-theme-material/dist/all.css";

// Material Dashboard 2 React Context Provider
import {MaterialUIControllerProvider} from "context";
import axios from "axios";
import {globalConfig, globalConfigUrl} from "./configuration/config";
import {Provider} from "react-redux";
import store from "./store/store";

const container = document.getElementById("app");
const root = createRoot(container);
axios.get(globalConfigUrl)
    .then((response) => {
        globalConfig.config = response.data;
        axios.defaults.baseURL = globalConfig.config.apiUrl;
        return (<BrowserRouter>
            <MaterialUIControllerProvider>
                <Provider store={store}>
                    <App/>
                </Provider>
            </MaterialUIControllerProvider>
        </BrowserRouter>);
    })
    .catch(e => {
        return <p style={{color: 'red', textAlign: 'center'}}>Error while fetching global config</p>;
    })
    .then((reactElement) => {
        const container = document.getElementById('app');
        const root = createRoot(container);
        root.render(reactElement);
    });

