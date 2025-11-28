"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { showToast } from "@/lib/global";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const initialState = { title: "", description: "", dueDate: "", priority: "medium", image: null };

const Add = () => {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const router = useRouter()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleCreateTodo = async e => {
    e.preventDefault();

    const { title, description, dueDate, priority, image } = state;

    if (!title.trim()) return showToast("Please enter a title for your todo", "error");

    setIsProcessing(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    const data = { title, description, dueDate, priority, image };

    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value)
    })

    axios.post("/api/todos", formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
      .then(({ data, status }) => {
        if (status === 201) {
          showToast("Todo created successfully!", "success");
          setState(initialState)
          console.log('data', data)
        }
      })
      .catch((error) => {
        const message = error.response?.data?.error || "Something went wrong. Please try again.";
        showToast(message, "error");
      })
      .finally(() => {
        setIsProcessing(false)
      });
  };

  return (
    <main className="flex grow items-center">
      <div className="container mx-auto px-4 py-15">
        <form onSubmit={handleCreateTodo}>
          <Card className="w-full max-w-[500px] mx-auto">
            <CardHeader className="flex items-start justify-between">
              <div>
                <CardTitle>Create a New Todo</CardTitle>
                <CardDescription>Fill in the details below to create a new todo</CardDescription>
              </div>
              <Button variant="ghost" size="sm" type="button" onClick={() => router.push("/dashboard/todos")}>Cancel</Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input type="text" id="title" placeholder="Todo title" name="title" value={state.title} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Todo description" name="description" value={state.description} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input type="date" id="dueDate" name="dueDate" value={state.dueDate} onChange={handleChange}
                    min={dayjs().format("YYYY-MM-DD")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select onValueChange={value => setState(s => ({ ...s, priority: value }))} value={state.priority}>
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
                <div className="grid gap-2">
                  <Label htmlFor="image">Attach Image</Label>
                  <Input type="file" id="image" accept="image/*" onChange={e => setState(s => ({ ...s, image: e.target.files[0] }))} />
                  {state.image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Preview:</p>
                      <img src={URL.createObjectURL(state.image)} alt="Preview" className="max-h-40 w-auto rounded border" />
                    </div>
                  )}
                </div>

              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isProcessing}>{isProcessing && <Spinner />}Create Todo</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </main>
  );
};

export default Add;
