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
import { MoreHorizontal, Edit, Trash } from "lucide-react"; // icon for the trigger
import { useRouter } from "next/navigation";


const All = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const router = useRouter()

    // Fetch all todos
    const fetchTodos = () => {
        const token = localStorage.getItem("token")
        setLoading(true);
        axios.get("/api/todos", { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => setTodos(data))
            .catch((error) => showToast(error.response?.data?.error || "Failed to fetch todos", "error"))
            .finally(() => setLoading(false));

    };

    useEffect(() => { fetchTodos() }, []);

    // Delete a todo
    const handleDelete = (id) => {

        if (!confirm("Are you sure you want to delete this todo?")) return;

        setDeletingId(id);
        const token = localStorage.getItem("token")
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
            <h1 className="text-2xl font-bold mb-6">All Todos</h1>

            <Table>
                <TableHeader>
                    <TableRow>
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
