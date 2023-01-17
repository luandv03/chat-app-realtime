import React, { useState, useEffect } from "react";
import { Navbar, Header, Input, ActionIcon, Loader } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";
import { useDebouncedValue } from "@mantine/hooks";
import { accountsService } from "../../services/account.service";
import { UserList } from "../UserComponent";
import { IUser } from "../../interfaces/user/user.interface";

export const NavbarChat = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [debounced] = useDebouncedValue(search, 500);

    const handleSearch = async () => {
        if (!debounced) return;
        setLoading(true);
        const response = await accountsService.searchUsers(debounced);
        setTimeout(() => setLoading(false), 500);
        setUsers(response.data);
    };

    useEffect(() => {
        handleSearch();
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
                            {debounced && !loading && <IconX size={18} />}
                            {loading && <Loader color="gray" size={18} />}
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
                        <div style={{ textAlign: "center" }}>No result</div>
                    )}
                </div>
            )}
        </Navbar>
    );
};
