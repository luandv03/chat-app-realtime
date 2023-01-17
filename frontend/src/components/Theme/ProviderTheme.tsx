import React, { useState, ReactNode } from "react";
import { ColorSchemeProvider, ColorScheme } from "@mantine/core";

export const ProviderTheme = ({ children }: { children: ReactNode }) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
        return (localStorage.getItem("theme") as ColorScheme)
            ? (localStorage.getItem("theme") as ColorScheme)
            : "light";
    });
    const toggleColorScheme = (value?: ColorScheme) => {
        console.log(value);
        localStorage.setItem(
            "theme",
            colorScheme === "dark" ? "light" : "dark"
        );
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    };

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            {children}
        </ColorSchemeProvider>
    );
};
