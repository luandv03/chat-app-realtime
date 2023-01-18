import React, { useState, useEffect } from "react";
import { Navbar, Header, Input, ActionIcon, Loader } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";
import { useDebouncedValue } from "@mantine/hooks";
import { accountsService } from "../../services/account.service";
import { UserList } from "../UserComponent";
import { IUser } from "../../interfaces/user/user.interface";
import { useAsync } from "../../hooks/use-async";

export const NavbarChat = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);
    const [debounced] = useDebouncedValue(search, 500);

    const [executeSearch, statusExecuteSearch] = useAsync<string>({
        delay: 500,
        asyncFunction: (payload) =>
            accountsService.searchUsers(payload as string),
        onResolve: (result) => {
            const { data } = result as { data: IUser[] };
            setUsers(data);
        },
    });

    useEffect(() => {
        if (!debounced.trim()) return;
        executeSearch(debounced.trim());
    }, [debounced]);

    return (
        <Navbar width={{ base: 300 }} p="xs">
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
                        width: "100%",
                        border: "1px solid gray",
                        borderRadius: "4px",
                    }}
                >
                    {users.length > 0 ? (
                        <UserList users={users} />
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
        </Navbar>
    );
};
