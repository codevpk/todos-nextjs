import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { randomId } from "@/lib/global";
import { verifyToken } from "@/lib/auth";

// POST /api/todos → Create a new todo
export async function POST(req) {

    await connectDB();

    const { uid } = await verifyToken(req)
    if (!uid) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }

    const { title, description, dueDate, priority } = await req.json();

    if (!title || title.trim() === "") { return NextResponse.json({ error: "Title is required" }, { status: 400 }); }

    const id = randomId();
    let date = dueDate
    if (dueDate) {
        date = new Date(dueDate)
        if (isNaN(date.getTime())) { return NextResponse.json({ error: "Invalid due date" }, { status: 400 }); }
    }

    const todo = await Todo.create({ uid, id, title, description, dueDate: date, priority });

    return NextResponse.json({ message: "Todo created successfully", todo }, { status: 201 });
}

// GET /api/todos → Fetch all todos
export async function GET(req) {

    await connectDB();

    const { uid } = await verifyToken(req)
    if (!uid) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }

    const todos = await Todo.find({ uid }).sort({ createdAt: -1 });
    return NextResponse.json(todos);
}
