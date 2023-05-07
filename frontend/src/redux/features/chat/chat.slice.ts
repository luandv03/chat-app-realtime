import { createSlice } from "@reduxjs/toolkit";

interface Avatar {
    public_id: string;
    url: string;
}

interface User {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    avatar: Avatar;
}

interface Chat {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    latestMessage: any;
    isGroupAdmin: User | null;
}

const initialState: Chat = {
    _id: "",
    chatName: "",
    isGroupChat: false,
    latestMessage: null,
    isGroupAdmin: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {},
});

const chatReducer = chatSlice.reducer;

export default chatReducer;
