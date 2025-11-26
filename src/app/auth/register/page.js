"use client";

import { useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Spinner } from "@/components/ui/spinner";
import { isValidEmail, showToast } from "@/lib/global";
import axios from "axios";

const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }

const Register = () => {

    const [state, setState] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleRegister = (e) => {
        e.preventDefault()

        let { fullName, email, password, confirmPassword } = state

        fullName = fullName.trim()
        email = email.trim()

        if (fullName.length < 3) { return showToast("Please enter your full name correctly", "error") }
        if (!isValidEmail(email)) { return showToast("Please enter your valid email", "error") }
        if (password.length < 6) { return showToast("Password must be at least 6 characters", "error") }
        if (confirmPassword !== password) { return showToast("Passwords do not match", "error") }

        const formData = { fullName, email, password }

        setIsProcessing(true)

        axios.post("/api/auth/register", formData)
            .then(({ data, status }) => {
                if (status === 201) {
                    const message = data.message || "Your account has been successfully registered.";
                    showToast(message, "success")
                    setState(initialState)
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
        <main className='flex-grow flex items-center'>
            <div className="container mx-auto px-4 py-15">
                <form onSubmit={handleRegister}>
                    <Card className="w-full max-w-[500px] mx-auto">
                        <CardHeader>
                            <CardTitle>Register a new account</CardTitle>
                            <CardDescription>Enter your details below to register your account</CardDescription>
                            <CardAction>
                                <Link href="/auth/login" className="ml-auto inline-block text-sm font-semibold underline-offset-4 hover:underline">Login</Link>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input type="text" id="fullName" placeholder="John Doe" name="fullName" value={state.fullName} onChange={handleChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="user@example.com" name="email" value={state.email} onChange={handleChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative w-full">
                                        <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" id="password" className="pr-10" name="password" value={state.password} onChange={handleChange} />
                                        <Button type="button" variant="ghost" className="transparent absolute right-0 rounded-tl-[0] rounded-bl-[0] top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative w-full">
                                        <Input type={showConfirmPassword ? "text" : "password"} placeholder="Enter your password again" id="confirmPassword" className="pr-10" name="confirmPassword" value={state.confirmPassword} onChange={handleChange} />
                                        <Button type="button" variant="ghost" className="transparent absolute right-0 rounded-tl-[0] rounded-bl-[0] top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full" disabled={isProcessing}>{isProcessing && <Spinner />}Register</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </main>
    )
}

export default Register