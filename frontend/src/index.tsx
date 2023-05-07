import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import { ProviderTheme } from "./components/Theme";
import { store } from "./redux/store.redux";
import AuthProvider from "./providers/AuthProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ProviderTheme>
                <Provider store={store}>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </Provider>
            </ProviderTheme>
        </BrowserRouter>
    </React.StrictMode>
);
