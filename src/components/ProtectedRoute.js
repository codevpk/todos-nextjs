"use client"
import { useAuthContext } from "@/context/Auth"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }) {

    const { isAppLoading, isAuth } = useAuthContext()
    const router = useRouter()
    const pathname = usePathname()

    if (isAppLoading) return null

    const isAuthRoute = pathname.startsWith("/auth")
    const isDashboardRoute = pathname.startsWith("/dashboard")

    useEffect(() => {
        if (!isAuth && isDashboardRoute) { router.replace("/auth/login") }
        else if (isAuth && isAuthRoute) { router.replace("/dashboard") }
    }, [isAuth, pathname])

    if ((!isAuth && isDashboardRoute) || (isAuth && isAuthRoute))
        return null
    return children
}
