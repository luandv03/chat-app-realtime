import React from "react";
import { Avatar, Button, Group, Text, Stack } from "@mantine/core";
import { IUser } from "../../interfaces/user/user.interface";

export const UserItem = ({ user }: { user: IUser }) => {
    return (
        <Button variant="default" m={0} p={0} fullWidth>
            <Group position="left" spacing={10} sx={{ width: "270px" }}>
                <Avatar
                    variant="outline"
                    src={user.avatar.url}
                    radius="xl"
                    size="sm"
                />
                <Stack spacing={0} sx={{ display: "flex", flex: 1 }}>
                    <Text weight={500} truncate={true}>
                        {user.email}
                    </Text>
                    <Text size="xs" truncate={true}>
                        {user.firstname + " " + user.lastname}
                    </Text>
                </Stack>
            </Group>
        </Button>
    );
};
