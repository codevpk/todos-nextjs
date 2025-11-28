"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { BadgeCheck, ChevronsUpDown, LogOut, Sun, Moon } from "lucide-react"
import { useAuthContext } from "@/context/Auth"
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch"; // shadcn switch
import { useRouter } from "next/navigation"

export function NavUser() {

    const { isMobile } = useSidebar()
    const { user, handleLogout } = useAuthContext()
    const { theme, setTheme } = useTheme()

    const router = useRouter()

    user.photoURL = user.photoURL || "https://umairahmad.net/img/testimonial-1.jpg"

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.photoURL} alt={user.fullName} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.fullName}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.photoURL} alt={user.fullName} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.fullName}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => router.push('/dashboard/account')}><BadgeCheck />Account</DropdownMenuItem>
                            {/* <DropdownMenuItem ><CircleUser />Profile</DropdownMenuItem> */}
                            <DropdownMenuItem className="flex items-center justify-between cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                <div className="flex items-center gap-2">{theme === "dark" ? <Sun /> : <Moon />}<span>Theme</span></div>
                                <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}><LogOut />Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
