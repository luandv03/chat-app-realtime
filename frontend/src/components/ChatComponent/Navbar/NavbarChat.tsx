import React, { useState, useEffect, useContext } from "react";
import {
    Navbar,
    Header,
    Input,
    ActionIcon,
    Loader,
    useMantineColorScheme,
    Center,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";
import { useDebouncedValue } from "@mantine/hooks";
import { accountsService } from "../../../services/account.service";
import { chatService } from "../../../services/chat.service";
import { UserList } from "../../UserComponent";
import { IUser } from "../../../interfaces/user/user.interface";
import { useAsync } from "../../../hooks/use-async";
import { ChatList } from "./ChatList";
import { AuthContext } from "../../../contexts/AuthContext";

export const NavbarChat = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);
    const [debounced] = useDebouncedValue(search, 500);
    const [listChats, setListChats] = useState<any[]>([]);
    const { colorScheme } = useMantineColorScheme();

    const { setSelectedChat } = useContext(AuthContext);

    const [executeSearch, statusExecuteSearch] = useAsync<string>({
        delay: 500,
        asyncFunction: (payload) =>
            accountsService.searchUsers(payload as string),
        onResolve: (result) => {
            const { data } = result as { data: IUser[] };
            setUsers(data);
        },
    });

    const [executeFetchChat, statusFecthChat] = useAsync({
        delay: 500,
        asyncFunction: () => {
            return chatService.fetchChat();
        },
        onResolve: (result) => {
            const { data } = result as { data: any[] };
            setListChats(data);
        },
    });

    const [executeAccessChat] = useAsync<string>({
        delay: 500,
        asyncFunction: (payload) => {
            return chatService.accessChat(payload as string);
        },
        onResolve: (result) => {
            const { data } = result as { data: any };
            setSelectedChat(data);
        },
        onReject: (error) => {
            console.log(error);
        },
    });

    useEffect(() => {
        if (!debounced.trim()) return;
        executeSearch(debounced.trim());
    }, [debounced]);

    useEffect(() => {
        executeFetchChat();
    }, []);

    return (
        <Navbar
            width={{ base: 400 }}
            pl="xs"
            pr="xs"
            sx={{ position: "relative", top: "0" }}
        >
            <Header height={50}>
                <Input
                    icon={<IconSearch size={18} />}
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    rightSection={
                        <ActionIcon onClick={() => setSearch("")}>
                            {debounced &&
                                !(statusExecuteSearch === "pending") && (
                                    <IconX size={18} />
                                )}
                            {statusExecuteSearch === "pending" && (
                                <Loader color="gray" size={18} />
                            )}
                        </ActionIcon>
                    }
                />
            </Header>
            {debounced && (
                <div
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        borderRadius: "4px",
                        position: "absolute",
                        top: "60px",
                        left: "10px",
                        right: "10px",
                        zIndex: 1,
                        overflow: "hidden",
                        background:
                            colorScheme === "light" ? "white" : "#25262b",
                    }}
                >
                    {users.length > 0 ? (
                        <>
                            <Center>Results</Center>
                            <UserList
                                users={users}
                                executeAccessChat={executeAccessChat}
                            />
                        </>
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                height: "30px",
                                padding: "5px",
                            }}
                        >
                            No result
                        </div>
                    )}
                </div>
            )}
            {statusFecthChat === "pending" && <Loader size={20} />}
            {listChats.length > 0 && (
                <ChatList
                    chats={listChats}
                    handleSelectedChat={setSelectedChat}
                />
            )}
        </Navbar>
    );
};
