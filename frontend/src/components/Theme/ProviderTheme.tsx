import React, { useState, ReactNode } from "react";
import { ColorSchemeProvider, ColorScheme } from "@mantine/core";

export const ProviderTheme = ({ children }: { children: ReactNode }) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            {children}
        </ColorSchemeProvider>
    );
};
