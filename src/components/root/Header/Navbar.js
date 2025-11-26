"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuthContext } from "@/context/Auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {

    const { isAuth, handleLogout } = useAuthContext()

    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const navItems = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-primary">Todos App</Link>

                <nav className="hidden md:flex gap-6">
                    {navItems.map(item => <Link key={item.href} href={item.href} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition">{item.label}</Link>)}
                </nav>

                <div className="flex items-center gap-3">
                    {!isAuth
                        ? <>
                            <Button className="cursor-pointer" onClick={() => router.push("/dashboard")}>Dashboard</Button>
                            <Link href="/auth/login" className="hidden md:inline-block px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-white dark:border-gray-700 dark:hover:bg-gray-200 dark:text-black rounded-lg transition">Login</Link>
                            <Link href="/auth/register" className="hidden md:inline-block px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-white dark:border-gray-700 dark:hover:bg-gray-200 dark:text-black rounded-lg transition">Register</Link>
                        </>
                        : <>
                            <Link href="/dashboard" className="hidden md:inline-block px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-white dark:border-gray-700 dark:hover:bg-gray-200 dark:text-black rounded-lg transition">Dashboard</Link>
                            <button className="hidden md:inline-block px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-white dark:border-gray-700 dark:hover:bg-gray-200 dark:text-black rounded-lg transition" onClick={handleLogout}>Logout</button>
                        </>
                    }

                    <ThemeToggle />

                    <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        {isOpen ? <X className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen &&
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                    <nav className="flex flex-col space-y-2 p-4">
                        {navItems.map(item => <Link key={item.href} href={item.href} onClick={closeMenu} className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition">{item.label}</Link>)}

                        <Link href="/auth/login" onClick={closeMenu} className="mt-2 text-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-white dark:border-gray-700 dark:hover:bg-gray-200 dark:text-black rounded-lg transition">Login</Link>
                    </nav>
                </div>
            }
        </header>
    );
};

export default Header;
