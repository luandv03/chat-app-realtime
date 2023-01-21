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
import { AuthContext } from "../../../contexts/AuthContext";
import { IUser } from "../../../interfaces/user/user.interface";
import { useAsync } from "../../../hooks/use-async";
import { messageService } from "../../../services/message.service";

export const ContentChat = () => {
    const [message, setMessage] = useState("");
    const [content, setContent] = useState([]);
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
            setContent(data);
        },
    });

    useEffect(() => {
        if (JSON.stringify(selectedChat) !== "{}")
            executeFetchMessage(selectedChat._id);
    }, [selectedChat]);

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
                        {content.length > 0 &&
                            content.map((item: any) => (
                                <Group
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
                        {message ? <IconSend /> : <IconMicrophone />}
                    </Button>
                </Group>
            </Center>
        </div>
    );
};
