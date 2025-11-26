"use client"

import { useAuthContext } from "@/context/Auth"

const Home = () => {
    const { user } = useAuthContext()
    return (
        <main className="grow">
            <div className="container mx-auto px-4 py-15">
                <h1 className="text-5xl text-center">Home page</h1>
                <h1 className="text-5xl text-center">Full Name: {user.fullName}</h1>
            </div>
        </main>
    )
}

export default Home