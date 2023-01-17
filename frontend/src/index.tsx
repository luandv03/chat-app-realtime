import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProviderTheme } from "./components/Theme";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ProviderTheme>
                    <App />
                </ProviderTheme>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
