import React, {
    FC,
    memo,
    // useContext
} from "react";
// import { AuthContext } from "../contexts/AuthContext";
import { HeaderChat } from "../components/ChatComponent";
// import { Layout } from "@mantine/core";

export const Chat: FC = () => {
    // const { user } = useContext(AuthContext);

    return (
        <>
            <HeaderChat />
        </>
    );
};

export const ChatLayout = memo(Chat);
