import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Center } from "@mantine/core";
import { ActionTheme } from "../components/Theme";

export const AuthLayout: FC = () => {
    return (
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
    );
};
