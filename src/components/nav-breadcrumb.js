"use client"

import { Fragment } from "react";
import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, } from "@/components/ui/breadcrumb"

const NavBreadcrumb = () => {

    const pathname = usePathname() || "/dashboard"
    const segments = pathname.split("/").filter(Boolean) // e.g. ["dashboard","todos","add"]

    const format = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

    // ensure first segment is "dashboard" for your layout
    // if path doesn't start with dashboard, you can adapt this part
    const rest = segments[0] === "dashboard" ? segments.slice(1) : segments

    return (
        <Breadcrumb>
            <BreadcrumbList className="flex items-center gap-2">
                {/* Fixed Dashboard item (same as your static code) */}
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>

                {/* Separator after Dashboard only when there are deeper segments */}
                {rest.length > 0 && (<BreadcrumbSeparator className="hidden md:block" />)}

                {/* Render remaining items as: <BreadcrumbItem/> <BreadcrumbSeparator/> <BreadcrumbItem/> ... */}
                {rest.map((segment, idx) => {
                    const isLast = idx === rest.length - 1
                    // build href relative to /dashboard
                    const href = "/dashboard/" + rest.slice(0, idx + 1).join("/")

                    return (
                        // NOTE: we return a React fragment containing two siblings:
                        // - BreadcrumbItem
                        // - possible BreadcrumbSeparator (AS A SIBLING, NOT INSIDE BreadcrumbItem)
                        <Fragment key={href}>
                            <BreadcrumbItem>
                                {isLast
                                    ? <BreadcrumbPage>{format(segment)}</BreadcrumbPage>
                                    : <BreadcrumbLink href={href}>{format(segment)}</BreadcrumbLink>
                                }
                            </BreadcrumbItem>

                            {/* Separator is a sibling of BreadcrumbItem, not its child */}
                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default NavBreadcrumb