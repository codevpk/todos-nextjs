"use client";

import { useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { GalleryVerticalEnd } from "lucide-react"
import { Spinner } from "@/components/ui/spinner";
import { isValidEmail, showToast } from "@/lib/global";

const initialState = { email: "" }

const ForgotPassword = () => {

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleLogin = (e) => {
        e.preventDefault()

        let { email } = state

        if (!isValidEmail(email)) { return showToast("Please enter your valid email", "error") }

        const formData = { email }
        setIsProcessing(false)

        console.log('formData', formData)
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
                            <CardTitle className="text-xl">Forgot your password?</CardTitle>
                            <CardDescription>Enter your email to receive a reset link</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input type="email" id="email" placeholder="user@example.com" name="email" value={state.email} onChange={handleChange} />
                                    </Field>
                                    <Field>
                                        <Button type="submit" disabled={isProcessing}>{isProcessing && <Spinner />}Send Reset Link</Button>
                                        <FieldDescription className="text-center">Remember Password? <Link href="/auth/login">Login</Link></FieldDescription>
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

export default ForgotPassword