import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env

export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json()

        if (!email || !password) { return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 }) }

        const user = await User.findOne({ email })
        if (!user) { return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 }) }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 }) }

        // Generate JWT token
        const token = jwt.sign({ uid: user.uid }, JWT_SECRET, { expiresIn: "1d" })

        return new Response(JSON.stringify({ message: "Login successful", token }), { status: 200 })
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
    }
}
