import React from "react";
import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

export const ActionTheme = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            sx={(theme) => ({
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[1],
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.yellow[4]
                        : theme.colors.blue[6],
            })}
        >
            {colorScheme === "dark" ? (
                <IconSun size={18} />
            ) : (
                <IconMoonStars size={18} />
            )}
        </ActionIcon>
    );
};
