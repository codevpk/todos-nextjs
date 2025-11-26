"use client"

import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/Auth"
import { useRouter } from "next/navigation"

const Home = () => {

    const { user } = useAuthContext()

    const router = useRouter()

    return (
        <main className="grow">
            <div className="container mx-auto px-4 py-15 text-center">
                <h1 className="text-5xl">Home page</h1>
                <h1 className="text-5xl">UID: {user.uid}</h1>
                <h1 className="text-5xl">Full Name: {user.fullName}</h1>
                <h1 className="text-5xl">Email: {user.email}</h1>
                <Button className="mt-5 cursor-pointer" onClick={() => router.push("/")}>Home</Button>
            </div>
        </main>
    )
}

export default Home