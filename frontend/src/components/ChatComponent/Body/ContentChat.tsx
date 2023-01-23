import React, { useContext, useEffect, useState } from "react";
import {
    Avatar,
    Group,
    Header,
    useMantineColorScheme,
    Stack,
    Text,
    Container,
    Input,
    Center,
    Button,
    ScrollArea,
} from "@mantine/core";
import { IconMoodSmile, IconSend, IconMicrophone } from "@tabler/icons";
import io from "socket.io-client";
import { AuthContext } from "../../../contexts/AuthContext";
import { IUser } from "../../../interfaces/user/user.interface";
import { useAsync } from "../../../hooks/use-async";
import { messageService } from "../../../services/message.service";
import { SOCKET_URL_BASE } from "../../../configs/routes.config";
var socket: any, selectedChatCompare: any;

export const ContentChat = () => {
    const [message, setMessage] = useState("");
    const [chatMessage, setChatMessage] = useState<any>([]);
    const { colorScheme } = useMantineColorScheme();
    const { selectedChat, user } = useContext(AuthContext);

    const handleGetUserOther = () => {
        return selectedChat.users
            ? selectedChat.users.filter(
                  (other: IUser) => other._id !== user?._id
              )
            : [];
    };

    const [executeFetchMessage, statusExecuteFetchMessage] = useAsync<string>({
        delay: 500,
        asyncFunction(payload) {
            return messageService.fetchMesaages(payload as string);
        },
        onResolve(result) {
            const { data } = result as { data: any };
            setChatMessage(data);
            socket.emit("join chat", selectedChat._id);
        },
    });

    const [executeSendMessage] = useAsync<{ chatId: string; content: string }>({
        delay: 500,
        asyncFunction(payload) {
            return messageService.sendMessage(
                payload as { chatId: string; content: string }
            );
        },
        onResolve(result: any) {
            const { data } = result as { data: any };
            console.log("send message successfully");
            socket.emit("new message", data);
            setChatMessage([...chatMessage, data]);
        },
    });

    useEffect(() => {
        socket = io(SOCKET_URL_BASE);
        socket.emit("setup", user);
        socket.on("connected", () => console.log("Connected to socket.io"));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (JSON.stringify(selectedChat) !== "{}")
            executeFetchMessage(selectedChat._id);

        selectedChatCompare = selectedChat;
        // eslint-disable-next-line
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved: any) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                // if (!notification.includes(newMessageRecieved)) {
                //     setNotification([newMessageRecieved, ...notification]);
                //     setFetchAgain(!fetchAgain);
                //   }
                console.log("123");
            } else {
                console.log("re-render");
                setChatMessage([...chatMessage, newMessageRecieved]);
            }
        });
        // eslint-disable-next-line
    }, []);

    const handleSendMessage = () => {
        executeSendMessage({
            chatId: selectedChat._id,
            content: message,
        });
    };

    return (
        <div
            style={{
                height: "100vh",
                padding: "10px",
                flex: "1",
                position: "relative",
            }}
        >
            <Header
                height={60}
                p={10}
                sx={{
                    background: colorScheme === "light" ? "white" : "#25262b",
                }}
            >
                <Group>
                    <Avatar
                        variant="outline"
                        src={
                            !selectedChat.isGroup &&
                            handleGetUserOther()[0]?.avatar?.url
                        }
                        radius="xl"
                        size="md"
                    />
                    <Stack spacing={0}>
                        <Text weight={500}>
                            {selectedChat.isGroup
                                ? selectedChat.chatName
                                : handleGetUserOther()[0]?.firstname}
                        </Text>
                        <Text>Last seen ....</Text>
                    </Stack>
                </Group>
            </Header>
            <Container>
                {statusExecuteFetchMessage === "pending" ? (
                    "loading..."
                ) : (
                    <ScrollArea.Autosize
                        maxHeight={300}
                        sx={{ maxWidth: "100%" }}
                    >
                        {chatMessage.length > 0 &&
                            chatMessage.map((item: any, index: number) => (
                                <Group
                                    key={index}
                                    spacing={1}
                                    m={5}
                                    position={
                                        item.sender._id === user?._id
                                            ? "right"
                                            : "left"
                                    }
                                >
                                    <Avatar
                                        src={item.sender.avatar.url}
                                        radius="xl"
                                        size="sm"
                                    />
                                    <span
                                        style={{
                                            background:
                                                colorScheme === "light"
                                                    ? "#faebd7"
                                                    : "#25262b",
                                            color:
                                                colorScheme === "dark"
                                                    ? "white"
                                                    : "#25262b",
                                            padding: "5px",
                                            display: "block",
                                            borderRadius: "4px",
                                            margin: "2px",
                                        }}
                                    >
                                        {item?.content}
                                    </span>
                                </Group>
                            ))}
                    </ScrollArea.Autosize>
                )}
            </Container>
            <Center>
                <Group
                    position="apart"
                    sx={{
                        position: "absolute",
                        bottom: "20px",
                    }}
                    spacing={5}
                >
                    <Input
                        size="lg"
                        placeholder="Message"
                        icon={<IconMoodSmile size={20} />}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button size="lg" radius="lg">
                        {message ? (
                            <IconSend onClick={() => handleSendMessage()} />
                        ) : (
                            <IconMicrophone />
                        )}
                    </Button>
                </Group>
            </Center>
        </div>
    );
};
