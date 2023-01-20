import React from "react";
import { Stack } from "@mantine/core";
import { ChatItem } from "./ChatItem";

export const ChatList = ({
    chats,
    handleSelectedChat,
}: {
    chats: any[];
    handleSelectedChat: (chatId: string) => void;
}) => {
    return (
        <Stack spacing={1}>
            {chats.map((item, index) => (
                <ChatItem
                    key={index}
                    chat={item}
                    handleSelectedChat={handleSelectedChat}
                />
            ))}
        </Stack>
    );
};
