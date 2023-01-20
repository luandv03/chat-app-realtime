import React, { FC, memo } from "react";
import { MainChat } from "../components/ChatComponent";

export const Chat: FC = () => {
    console.log("Chat layout");
    return (
        <>
            <MainChat />
        </>
    );
};

export const ChatLayout = memo(Chat);
