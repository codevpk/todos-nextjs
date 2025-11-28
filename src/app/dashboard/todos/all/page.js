"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { showToast } from "@/lib/global";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, CheckCircle2 } from "lucide-react"; // icon for the trigger
import { useRouter } from "next/navigation";
import Image from "next/image";

const All = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const router = useRouter()

    const token = localStorage.getItem("token")

    const fetchTodos = () => {
        setLoading(true);
        axios.get("/api/todos", { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => setTodos(data))
            .catch((error) => showToast(error.response?.data?.error || "Failed to fetch todos", "error"))
            .finally(() => setLoading(false));

    };

    useEffect(() => { fetchTodos() }, []);

    const handleMarkCompleted = async (id) => {
        try {

            const { data } = await axios.patch(`/api/todos/${id}`, { isCompleted: true }, { headers: { Authorization: `Bearer ${token}` } });
            showToast(data.message || "Todo marked as completed!", "success");

            setTodos(prev => prev.map(t => t.id === id ? { ...t, isCompleted: true } : t));
        } catch (err) {
            showToast(err.response?.data?.error || "Failed to mark as completed", "error");
        }
    }

    const handleDelete = (id) => {

        if (!confirm("Are you sure you want to delete this todo?")) return;

        setDeletingId(id)
        axios
            .delete(`/api/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                showToast(data.message || "Todo deleted", "success");
                const filteredTodos = todos.filter((todo) => todo.id !== id);
                setTodos(filteredTodos);
            })
            .catch((error) => showToast(error.response?.data?.error || "Failed to delete todo", "error"))
            .finally(() => setDeletingId(null));
    };

    if (loading) return <div className="flex justify-center py-10"><Spinner /></div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">All Todos</h1>
                <Button onClick={() => router.push("/dashboard/todos/add")}>Add Todo</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todos.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">No todos found.</TableCell>
                        </TableRow>
                    )}
                    {todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell>
                                {todo.image && <Image src={todo.image} alt={todo.title} width={64} height={64} className="rounded object-cover" />}
                            </TableCell>
                            <TableCell>{todo.title}</TableCell>
                            <TableCell>{todo.description}</TableCell>
                            <TableCell>{todo.dueDate ? dayjs(todo.dueDate).format("ddd, DD MMM YYYY") : "-"}</TableCell>
                            <TableCell className="capitalize">{todo.priority}</TableCell>
                            <TableCell>{todo.isCompleted ? <Badge variant="success">Completed</Badge> : <Badge variant="destructive">Pending</Badge>}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleMarkCompleted(todo.id)} disabled={todo.isCompleted}><CheckCircle2 className={`mr-2 h-4 w-4 ${todo.isCompleted ? "text-green-500" : ""}`} />Mark as Completed</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/todos/${todo.id}`)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(todo.id)} disabled={deletingId === todo.id}>
                                            <Trash className="mr-2 h-4 w-4" />{deletingId === todo.id ? <Spinner size="sm" /> : "Delete"}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default All;
