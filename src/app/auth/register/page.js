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

const Register = () => {
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
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" required />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm font-semibold underline-offset-4 hover:underline">Forgot your password?</Link>
                                    </div>
                                    <Input id="password" type="password" required />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">Login</Button>
                        <Button variant="outline" className="w-full">Login with Google</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}

export default Register