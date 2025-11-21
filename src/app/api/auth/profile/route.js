import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
    try {
        const { uid } = await verifyToken(req)
        await connectDB();

        const user = await User.findOne({ uid }).select("-password")
        if (!user) { return new Response(JSON.stringify({ error: "User not found" }), { status: 404 }) }

        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
