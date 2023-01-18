import React from "react";
import { Stack } from "@mantine/core";
import { ChatItem } from "./ChatItem";

export const ChatList = ({ chats }: { chats: any[] }) => {
    return (
        <Stack spacing={1}>
            {chats.map((item, index) => (
                <ChatItem key={index} chat={item} />
            ))}
        </Stack>
    );
};
