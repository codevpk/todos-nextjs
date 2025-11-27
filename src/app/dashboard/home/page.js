"use client"

import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/Auth"
import { useRouter } from "next/navigation"

const Home = () => {

    const { user } = useAuthContext()

    const router = useRouter()

    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl flex justify-center items-center text-center">
                    <h1 className="text-4xl">UID<br />{user.uid}</h1>
                </div>
                <div className="bg-muted/50 aspect-video rounded-xl flex justify-center items-center text-center">
                    <h1 className="text-4xl">Full Name<br />{user.fullName}</h1>
                </div>
                <div className="bg-muted/50 aspect-video rounded-xl flex justify-center items-center text-center">
                    <h1 className="text-4xl">Email<br />{user.email}</h1>
                </div>
            </div>
            <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min flex justify-center items-center">
                <Button className="mt-5 cursor-pointer" onClick={() => router.push("/")}>Home</Button>
            </div>
        </>
    )
}

export default Home