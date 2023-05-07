import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Center } from "@mantine/core";
import { ActionTheme } from "../components/Theme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export const AuthLayout: FC = () => {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Notifications />
            <Center>
                <Outlet />
                <div
                    style={{
                        position: "fixed",
                        top: "10px",
                        right: "10px",
                    }}
                >
                    <ActionTheme />
                </div>
            </Center>
        </MantineProvider>
    );
};
