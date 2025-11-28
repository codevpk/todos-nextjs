import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

// Fetch profile
export async function GET(req) {
    try {
        await connectDB();
        const { uid } = await verifyToken(req);

        const user = await User.findOne({ uid }).select("-password");
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Update profile (name + photo)
export async function PATCH(req) {
    await connectDB();
    const { uid } = await verifyToken(req);
    if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();
        const fullName = formData.get("fullName");
        const photoFile = formData.get("photo");

        if (!fullName || fullName.trim().length < 3)
            return NextResponse.json({ error: "Full name is required" }, { status: 400 });

        let photoURL;
        if (photoFile && photoFile.size > 0) {
            const buffer = Buffer.from(await photoFile.arrayBuffer());
            photoURL = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "todos/images" },
                    (err, result) => (err ? reject(err) : resolve(result.secure_url))
                );
                Readable.from(buffer).pipe(uploadStream);
            });
        }

        const updatedUser = await User.findOneAndUpdate({ uid }, { fullName, ...(photoURL && { photoURL }) }, { new: true }).select("-password");

        return NextResponse.json({ message: "Profile updated successfully", user: updatedUser }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

// Change password
export async function PUT(req) {
    await connectDB();
    const { uid } = await verifyToken(req);
    if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();
        const currentPassword = formData.get("currentPassword");
        const newPassword = formData.get("newPassword");

        if (!currentPassword || !newPassword)
            return NextResponse.json({ error: "Both current and new password are required" }, { status: 400 });

        const user = await User.findOne({ uid });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });

        if (newPassword.length < 6)
            return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
