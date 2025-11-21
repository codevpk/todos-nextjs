import { randomId } from "@/lib/global";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB()
        const { fullName, email, password } = await req.json()

        if (!fullName || !email || !password) { return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 }) }

        if (password.length < 6) { return new Response(JSON.stringify({ error: "Password must be at least 6 characters" }), { status: 400 }) }

        const existingUser = await User.findOne({ email })
        if (existingUser) { return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 }) }

        const hashedPassword = await bcrypt.hash(password, 10)

        const uid = randomId()
        const newUser = await User.create({ uid, fullName, email, password: hashedPassword })

        return new Response(JSON.stringify({ message: "User created successfully", userId: newUser.uid }), { status: 201 })
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
    }
}
