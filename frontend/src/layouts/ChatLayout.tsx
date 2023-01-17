import React, { FC, memo } from "react";
import { MainChat } from "../components/ChatComponent";

export const Chat: FC = () => {
    return (
        <>
            <MainChat />
        </>
    );
};

export const ChatLayout = memo(Chat);
