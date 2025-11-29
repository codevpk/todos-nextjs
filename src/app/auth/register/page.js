"use client";

import { useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, GalleryVerticalEnd } from "lucide-react"
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
        <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"><GalleryVerticalEnd className="size-4" /></div>
                    Todos App
                </Link>
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Create your account</CardTitle>
                            <CardDescription>Enter your details below to register your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRegister}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                                        <Input type="text" id="fullName" placeholder="Enter your full name" name="fullName" value={state.fullName} onChange={handleChange} />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input type="email" id="email" placeholder="Enter your email" name="email" value={state.email} onChange={handleChange} />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <div className="relative w-full">
                                            <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" id="password" className="pr-10" name="password" value={state.password} onChange={handleChange} />
                                            <Button type="button" variant="ghost" className="transparent absolute right-0 rounded-tl-none rounded-bl-none top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
                                        </div>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                        <div className="relative w-full">
                                            <Input type={showConfirmPassword ? "text" : "password"} placeholder="Enter your password again" id="confirmPassword" className="pr-10" name="confirmPassword" value={state.confirmPassword} onChange={handleChange} />
                                            <Button type="button" variant="ghost" className="transparent absolute right-0 rounded-tl-none rounded-bl-none top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
                                        </div>
                                    </Field>
                                    <Field>
                                        <Button type="submit" disabled={isProcessing}>{isProcessing && <Spinner />}Register</Button>
                                        <FieldDescription className="text-center">Already have an account? <Link href="/auth/login">Login</Link></FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                    <FieldDescription className="px-6 text-center">By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</FieldDescription>
                </div>
            </div>
        </main>
    )
}

export default Register