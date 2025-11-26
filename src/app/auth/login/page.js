"use client";

import { useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Spinner } from "@/components/ui/spinner";
import { isValidEmail, showToast } from "@/lib/global";
import { useAuthContext } from "@/context/Auth";
import axios from "axios";

const initialState = { email: "", password: "" }

const Login = () => {

    const { readProfile } = useAuthContext()

    const [state, setState] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const router = useRouter()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleLogin = (e) => {
        e.preventDefault()

        let { email, password } = state

        if (!isValidEmail(email)) { return showToast("Please enter your valid email", "error") }

        const formData = { email, password }

        setIsProcessing(true)

        axios.post("/api/auth/login", formData)
            .then(({ data, status }) => {
                if (status === 200) {
                    const message = data.message || "Login successful";
                    showToast(message, "success")

                    localStorage.setItem("token", data.token)
                    readProfile()
                    router.push("/")
                }
            })
            .catch((error) => {
                const message = error.response?.data?.error || "Something went wrong. Please try again.";
                showToast(message, "error");
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }

    return (
        <main className='flex grow items-center'>
            <div className="container mx-auto px-4 py-15">
                <form onSubmit={handleLogin}>
                    <Card className="w-full max-w-[500px] mx-auto">
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>Enter your credentials to login to your account</CardDescription>
                            <CardAction>
                                <Link href="/auth/register" className="ml-auto inline-block text-sm font-semibold underline-offset-4 hover:underline">Register</Link>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="user@example.com" name="email" value={state.email} onChange={handleChange} />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm font-semibold underline-offset-4 hover:underline">Forgot your password?</Link>
                                    </div>
                                    <div className="relative w-full">
                                        <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" id="password" className="pr-10" name="password" value={state.password} onChange={handleChange} />
                                        <Button type="button" variant="ghost" className="transparent absolute right-0 rounded-tl-none rounded-bl-none top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full" disabled={isProcessing}>{isProcessing && <Spinner />}Login</Button>
                            <Button type="button" variant="outline" className="w-full">Login with Google</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </main>
    )
}

export default Login