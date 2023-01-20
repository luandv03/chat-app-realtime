import React from "react";
import { Group } from "@mantine/core";
import { NavbarChat } from "../NavbarChat";
import { ContentChat } from "./";

export const BodyChat = () => {
    return (
        <Group>
            <NavbarChat />
            <ContentChat />
        </Group>
    );
};
