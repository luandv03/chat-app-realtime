import React, { useContext, useEffect, useState, useRef } from "react";
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
    ScrollArea,
    ActionIcon,
    Loader,
} from "@mantine/core";
import { IconMoodSmile, IconSend, IconMicrophone } from "@tabler/icons";
import io from "socket.io-client";
// import moment from "moment";
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

    const viewport = useRef<HTMLDivElement>(null);

    const scrollToBottom = () =>
        viewport?.current?.scrollTo({
            top: viewport?.current?.scrollHeight,
            behavior: "smooth",
        });

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

    const [executeSendMessage, statusExecuteSendMessage] = useAsync<{
        chatId: string;
        content: string;
    }>({
        delay: 500,
        asyncFunction(payload) {
            return messageService.sendMessage(
                payload as { chatId: string; content: string }
            );
        },
        onResolve(result: any) {
            setMessage("");
            scrollToBottom();
            const { data } = result as { data: any };
            console.log("send message successfully");
            socket.emit("new message", data);
            setChatMessage((prevMessage: any) => [...prevMessage, data]);
        },
        onReject(error: any) {
            alert(error.message);
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

    const handleSendMessage = () => {
        executeSendMessage({
            chatId: selectedChat._id,
            content: message,
        });
    };

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
                setChatMessage([...chatMessage, newMessageRecieved]);
                scrollToBottom();
            }
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div
            style={{
                flex: "1",
                position: "relative",
                height: "calc(100vh - 60px)",
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
                        maxHeight="calc(100vh - 60px - 60px - 80px)"
                        sx={{
                            maxWidth: "100%",
                        }}
                        viewportRef={viewport}
                    >
                        {/* <Center>
                                <Text size="md" weight={500}>
                                    {selectedChat && selectedChat.createdAt}
                                </Text>
                            </Center> */}
                        {chatMessage.length > 0 &&
                            chatMessage.map((item: any, index: number) => (
                                <Group
                                    key={item._id}
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
            <Center sx={{ height: "30px" }}>
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
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    {message ? (
                        <ActionIcon
                            size="xl"
                            radius="xl"
                            onClick={() => handleSendMessage()}
                        >
                            {statusExecuteSendMessage === "pending" ? (
                                <Loader />
                            ) : (
                                <IconSend />
                            )}
                        </ActionIcon>
                    ) : (
                        <ActionIcon size="xl" radius="xl">
                            <IconMicrophone />
                        </ActionIcon>
                    )}
                </Group>
            </Center>
        </div>
    );
};
