"use client"

import * as React from "react"
import { Bot, Command, SquareTerminal, } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, } from "@/components/ui/sidebar"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

const data = {
    user: { name: "shadcn", email: "m@example.com", avatar: "https://umairahmad.net/img/testimonial-1.jpg", },
    navMain: [
        { title: "Dashboard", url: "/", icon: SquareTerminal },
        {
            title: "Todos", icon: Bot,
            items: [
                { title: "Add", url: "/dashboard/todos/add" },
                { title: "All", url: "/dashboard/todos/all" },
            ]
        }
    ]
}

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <span className="cursor-default">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">CoDev Technologies</span>
                                    <span className="truncate text-xs">Todos App</span>
                                </div>
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
