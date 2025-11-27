import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { verifyToken } from "@/lib/auth";

// GET /api/todos/[id] → Get single todo by custom id
export async function GET(req, { params }) {

    await connectDB();

    const { uid } = await verifyToken(req)
    if (!uid) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }

    const { id } = await params;

    const todo = await Todo.findOne({ id, uid });
    if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    return NextResponse.json(todo, { status: 200 });
}

// PATCH /api/todos/[id] → Update todo by custom id
export async function PATCH(req, { params }) {

    await connectDB();

    const { uid } = await verifyToken(req)
    if (!uid) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }

    const { id } = await params;
    const { title, description, dueDate, priority, isCompleted } = await req.json();

    const updatedTodo = await Todo.findOneAndUpdate(
        { id },
        {
            ...(title && { title }),
            ...(description !== undefined && { description }),
            ...(dueDate && { dueDate }),
            ...(priority && { priority }),
            ...(isCompleted !== undefined && { isCompleted }),
        },
        { new: true }
    );

    if (!updatedTodo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    return NextResponse.json({ message: "Todo updated successfully", todo: updatedTodo }, { status: 200 });
}

// DELETE /api/todos/[id] → Delete todo by custom id
export async function DELETE(req, { params }) {

    await connectDB();
    const { uid } = await verifyToken(req)

    if (!uid) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }

    const { id } = await params;

    const deletedTodo = await Todo.findOneAndDelete({ id, uid });
    if (!deletedTodo) { return NextResponse.json({ error: "Todo not found" }, { status: 404 }); }

    return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });
}
