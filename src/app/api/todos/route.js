import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { randomId } from "@/lib/global";
import { verifyToken } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

export async function POST(req) {
    await connectDB();

    const { uid } = await verifyToken(req);
    if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const dueDate = formData.get("dueDate");
        const priority = formData.get("priority") || "medium";
        const imageFile = formData.get("image"); // File object

        if (!title || title.trim() === "") {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        let date = dueDate ? new Date(dueDate) : null;
        if (dueDate && isNaN(date.getTime())) {
            return NextResponse.json({ error: "Invalid due date" }, { status: 400 });
        }

        let imageUrl = null;

        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Cloudinary upload using stream
            imageUrl = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "todos/images",   // nested folder
                        resource_type: "image",
                        public_id: undefined,      // Cloudinary auto-generates unique filename
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    }
                );

                const stream = Readable.from(buffer);
                stream.pipe(uploadStream);
            });
        }

        const id = randomId();
        const todo = await Todo.create({
            uid,
            id,
            title,
            description,
            dueDate: date,
            priority,
            image: imageUrl,
        });

        return NextResponse.json({ message: "Todo created successfully", todo }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET(req) {

    await connectDB();

    const { uid } = await verifyToken(req)
    if (!uid) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }

    const todos = await Todo.find({ uid }).sort({ createdAt: -1 });
    return NextResponse.json(todos);
}
