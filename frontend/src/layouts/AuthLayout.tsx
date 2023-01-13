import React, { FC } from "react";
import { Center } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const AuthLayout: FC = () => {
    return (
        <Center>
            <Outlet />
        </Center>
    );
};
