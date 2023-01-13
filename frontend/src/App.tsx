import React from "react";
import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import {
    AUTH_ROOT_ROUTE,
    AUTH_LOGIN_ROUTE,
    AUTH_REGISTER_ROUTE,
    CHAT_ROOT_ROUTE,
} from "./configs/routes.config";
import { AuthLayout, ChatLayout } from "./layouts";
import { LoginAuth, RegisterAuth } from "./components/AuthComponent";

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Routes>
                {/* <Route path={AUTH_ROOT_ROUTE} element={<AuthLayout />}> */}
                <Route path={AUTH_LOGIN_ROUTE} element={<LoginAuth />} />
                <Route path={AUTH_REGISTER_ROUTE} element={<RegisterAuth />} />
                {/* </Route> */}
                <Route path={CHAT_ROOT_ROUTE} element={<ChatLayout />}></Route>
            </Routes>
        </MantineProvider>
    );
}

export default App;
