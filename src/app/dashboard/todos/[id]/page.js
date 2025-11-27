"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { showToast } from "@/lib/global";
import axios from "axios";
import dayjs from "dayjs";

const Edit = () => {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [state, setState] = useState({ title: "", description: "", dueDate: "", priority: "medium", isCompleted: false });
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setState(s => ({ ...s, [name]: type === "checkbox" ? checked : value }))
    }

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`/api/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                setState({
                    title: data.title || "",
                    description: data.description || "",
                    dueDate: data.dueDate ? dayjs(data.dueDate).format("YYYY-MM-DD") : "",
                    priority: data.priority || "medium",
                    isCompleted: data.isCompleted || false,
                });
            })
            .catch((err) => showToast(err.response?.data?.error || "Failed to fetch todo", "error"))
            .finally(() => setLoading(false));
    }, [id]);


    const handleUpdate = async e => {
        e.preventDefault();

        if (!state.title.trim()) return showToast("Please enter a title for your todo", "error");

        setIsProcessing(true);
        try {
            const { data, status } = await axios.patch(`/api/todos/${id}`, state, { headers: { Authorization: `Bearer ${token}` } });
            if (status === 200) {
                showToast("Todo updated successfully!", "success");
                router.push("/dashboard/todos/all");
            }
        } catch (error) {
            const message = error.response?.data?.error || "Something went wrong. Please try again.";
            showToast(message, "error");
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) return <div className="flex justify-center py-10"><Spinner /></div>;

    return (
        <main className="flex grow items-center">
            <div className="container mx-auto px-4 py-15">
                <form onSubmit={handleUpdate}>
                    <Card className="w-full max-w-[500px] mx-auto">
                        <CardHeader>
                            <CardTitle>Update Todo</CardTitle>
                            <CardDescription>Update the details of your todo below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" value={state.title} onChange={handleChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" name="description" value={state.description} onChange={handleChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="dueDate">Due Date</Label>
                                    <Input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={state.dueDate}
                                        min={dayjs().format("YYYY-MM-DD")}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select value={state.priority} onValueChange={value => setState(s => ({ ...s, priority: value }))}>
                                        <SelectTrigger id="priority" className="w-full">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isCompleted"
                                        name="isCompleted"
                                        checked={state.isCompleted}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-blue-500"
                                    />
                                    <Label htmlFor="isCompleted">Completed</Label>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full" disabled={isProcessing}>
                                {isProcessing && <Spinner />} Update Todo
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </main>
    );
};

export default Edit;
