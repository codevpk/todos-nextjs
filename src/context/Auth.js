"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

const Auth = createContext();

export default function AuthProvider({ children }) {

    const [isAppLoading, setIsAppLoading] = useState(true)
    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {

        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        setTimeout(() => { setIsAppLoading(false) }, 1500);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/dashboard");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/auth/login");
    };

    return (
        <Auth.Provider value={{ isAppLoading, user, login, logout }}>
            {children}
        </Auth.Provider>
    );
}

export const useAuthContext = () => useContext(Auth)