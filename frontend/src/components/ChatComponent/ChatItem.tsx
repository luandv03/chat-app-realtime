import React, { useContext } from "react";
import { Button, Group, Avatar, Stack, Text } from "@mantine/core";
import { AuthContext } from "../../contexts/AuthContext";

export const ChatItem = ({ chat }: { chat: any }) => {
    const { user } = useContext(AuthContext);

    const handleFormatDate = (date: any): string => {
        const newDate = new Date(date);
        return `${newDate.getDate()}/${
            newDate.getMonth() + 1
        }/${newDate.getFullYear()}`;
    };

    return (
        <Button variant="default" m={0} p={0} fullWidth sx={{ height: "50px" }}>
            <Group position="left" spacing={10} sx={{ width: "270px" }}>
                <Avatar
                    variant="outline"
                    src={
                        !chat.isGroupChat &&
                        chat.latestMessage.sender.avatar.url
                    }
                    radius="xl"
                    size="md"
                />
                <Stack spacing={0} sx={{ display: "flex", flex: 1 }}>
                    <Group position="apart">
                        <Text size="sm" lineClamp={1}>
                            {user?._id === chat.latestMessage.sender._id
                                ? "You"
                                : chat.latestMessage.sender.firstname +
                                  " " +
                                  chat.latestMessage.sender.lastname}
                        </Text>
                        <Text size="xs">
                            {handleFormatDate(chat.updatedAt)}
                        </Text>
                    </Group>
                    <Text weight={400} lineClamp={1} sx={{ width: "100%" }}>
                        {chat.latestMessage.content}
                    </Text>
                </Stack>
            </Group>
        </Button>
    );
};
