"use client"

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight, SquareTerminal, Bot } from "lucide-react"
import { usePathname } from "next/navigation"

export function NavMain() {

    const pathname = usePathname()
    const isTodosRoute = pathname?.startsWith("/dashboard/todos")

    const items = [
        { title: "Dashboard", url: "/dashboard", icon: SquareTerminal },
        {
            title: "Todos",
            icon: Bot,
            isActive: isTodosRoute,
            items: [
                { title: "Add", url: "/dashboard/todos/add" },
                { title: "All", url: "/dashboard/todos/all" },
            ],
        },
    ]

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = item.items && item.items.length > 0

                    // If the item has sub-items, use Collapsible
                    if (hasChildren) {
                        return (
                            <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )
                    }

                    // If no children, render just a regular SidebarMenuItem
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <a href={item.url} className="flex items-center gap-2">
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
