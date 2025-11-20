"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <main className='flex-grow flex items-center'>
            <div className="container mx-auto px-4 py-15">
                <Card className="w-[500px] mx-auto">
                    <CardHeader>
                        <CardTitle>Register a new account</CardTitle>
                        <CardDescription>Enter your details below to register your account</CardDescription>
                        <CardAction>
                            <Link href="/auth/login" className="ml-auto inline-block text-sm font-semibold underline-offset-4 hover:underline">Login</Link>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input type="text" id="fullName" placeholder="John Doe" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="user@example.com" required />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm font-semibold underline-offset-4 hover:underline">Forgot your password?</Link>
                                    </div>
                                    {/* <Input type="password" id="password" placeholder="******" required /> */}
                                    <div className="relative w-full">
                                        <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="pr-10" />
                                        <Button type="button" variant="ghost" className="transparent absolute right-1 top-1/2 -translate-y-1/2 p-1" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">Register</Button>
                        {/* <Button variant="outline" className="w-full">Login with Google</Button> */}
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}

export default Register