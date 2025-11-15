"use client";

import { ThemeProvider } from "next-themes";
import AuthProvider from "./Auth";
import ScreenLoader from "./ScreenLoader";

export default function AppProvider({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <AuthProvider>
                <ScreenLoader>
                    {children}
                </ScreenLoader>
            </AuthProvider>
        </ThemeProvider>
    );
}
