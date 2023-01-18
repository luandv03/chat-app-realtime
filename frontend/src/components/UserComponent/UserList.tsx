import React from "react";
import { UserItem } from "./UserItem";
import { IUser } from "../../interfaces/user/user.interface";
import { Stack } from "@mantine/core";

export const UserList = ({ users }: { users: IUser[] }) => {
    return (
        <Stack spacing={1}>
            {users.map((item, index) => (
                <UserItem user={item} key={index} />
            ))}
        </Stack>
    );
};
