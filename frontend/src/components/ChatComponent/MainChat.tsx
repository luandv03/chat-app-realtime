import React from "react";
import { HeaderChat } from "./Header/HeaderChat";
import { BodyChat } from "./Body";

export const MainChat = () => {
    return (
        <div style={{ height: "100vh" }}>
            <HeaderChat />
            <BodyChat />
        </div>
    );
};
