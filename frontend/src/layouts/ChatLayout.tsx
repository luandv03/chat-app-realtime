import React, { FC, memo } from "react";
import { HeaderChat } from "../components/ChatComponent";

export const Chat: FC = () => {
    return (
        <>
            <HeaderChat />
        </>
    );
};

export const ChatLayout = memo(Chat);
