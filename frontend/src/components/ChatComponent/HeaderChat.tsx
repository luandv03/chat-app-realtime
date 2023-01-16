import React, { useContext, useState } from "react";
import {
    Avatar,
    Header,
    createStyles,
    Group,
    Text,
    Menu,
    UnstyledButton,
} from "@mantine/core";
import { IconChevronDown, IconLogout, IconUserCircle } from "@tabler/icons";
import { AuthContext } from "../../contexts/AuthContext";

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
        }).background,
        borderBottom: `1px solid ${
            theme.fn.variant({ variant: "filled", color: theme.primaryColor })
                .background
        }`,
        marginBottom: 120,
    },

    user: {
        color: theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: "background-color 100ms ease",

        "&:hover": {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background!,
                0.1
            ),
        },
    },

    userActive: {
        backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor })
                .background!,
            0.1
        ),
    },
}));

export const HeaderChat = () => {
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { cx, theme, classes } = useStyles();
    const { user } = useContext(AuthContext);
    return (
        <Header
            height={60}
            className={classes.header}
            mb={120}
            pt={0}
            pl={20}
            pr={20}
        >
            <Group position="apart" sx={{ height: "100%" }}>
                <Text size={30} sx={{ cursor: "pointer" }} color={theme.white}>
                    IChat
                </Text>
                <Menu
                    width={260}
                    position="bottom-end"
                    transition="pop-top-right"
                    onClose={() => setUserMenuOpened(false)}
                    onOpen={() => setUserMenuOpened(true)}
                >
                    <Menu.Target>
                        <UnstyledButton
                            className={cx(classes.user, {
                                [classes.userActive]: userMenuOpened,
                            })}
                        >
                            <Group spacing={7}>
                                <Avatar
                                    src={user?.avatar}
                                    alt={user?.firstname + " " + user?.lastname}
                                    radius="xl"
                                    size={20}
                                />
                                <Text
                                    weight={500}
                                    size="sm"
                                    sx={{ lineHeight: 1, color: theme.white }}
                                    mr={3}
                                >
                                    {user?.firstname + " " + user?.lastname}
                                </Text>
                                <IconChevronDown size={12} stroke={1.5} />
                            </Group>
                        </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            icon={<IconUserCircle size={14} stroke={1.5} />}
                        >
                            My profile
                        </Menu.Item>
                        <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Header>
    );
};
