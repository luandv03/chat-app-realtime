import React from "react";
import { Group } from "@mantine/core";
import { NavbarChat } from "../Navbar";
import { ContentChat } from ".";

export const BodyChat = () => {
    return (
        <Group>
            <NavbarChat />
            <ContentChat />
        </Group>
    );
};
