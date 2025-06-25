"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { createTask } from "@/app/actions/createTask";

type UserType = {
    id: string;
    name: string | null;
    email: string;
    role: "USER" | "ADMIN";
    _count?: {
        tasks: number;
    };
}

type AdminUsersPageProps = {
    users: UserType[];
};

export default function AdminUsersPage({ users }: AdminUsersPageProps) {
    return (
        <div className="max-w-3xl mx-auto py-10 space-y-6">
            <div className="flex items-center justify-between mb-6">
                <Link href="/admin">
                    <Button variant="outline" className="font-semibold border-rose-400 text-rose-700 dark:border-rose-500 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900 transition-all">
                        ← Back to Admin
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-rose-700 dark:text-rose-400 m-0">
                    Manage Users
                </h1>
                <div />
            </div>
            <div className="space-y-4">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        className="p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900 space-y-2 border border-rose-200 dark:border-rose-800 transition-all duration-200 hover:scale-[1.025] hover:shadow-lg hover:border-rose-400 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-zinc-800 group"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors duration-200">
                                    {user.name}
                                </p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-rose-500 dark:group-hover:text-rose-300 transition-colors duration-200">
                                    {user.email}
                                </p>
                                <p className="text-sm capitalize text-rose-700 dark:text-rose-400 group-hover:underline">
                                    Role: {user.role.toLowerCase()}
                                </p>
                                {user._count && (
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-rose-500 dark:group-hover:text-rose-300 transition-colors duration-200">
                                        Tasks: {user._count.tasks}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <AddTaskDialog userId={user.id} />
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-rose-400 text-rose-700 dark:border-rose-500 dark:text-rose-300 bg-white dark:bg-zinc-900 hover:bg-rose-100 dark:hover:bg-rose-900 hover:scale-110 hover:shadow-xl hover:border-rose-600 dark:hover:border-rose-400 focus:ring-4 focus:ring-rose-200 dark:focus:ring-rose-800 transition-all duration-200 font-semibold cursor-pointer"
                                >
                                    <Link href={`/admin/users/${user.id}`}>
                                        View Tasks
                                    </Link>
                                </Button>

                                <RoleToggle user={user} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function AddTaskDialog({ userId }: { userId: string }) {
    const [open, setOpen] = useState(false);
    
    const handleSubmit = async (formData: FormData) => {
        await createTask(formData);
        setOpen(false); // Close the dialog after successful creation
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="secondary"
                    className="text-rose-700 border-rose-400 dark:text-rose-300 dark:border-rose-500 bg-white dark:bg-zinc-900 hover:bg-rose-100 dark:hover:bg-rose-900 hover:scale-110 hover:shadow-xl hover:border-rose-600 dark:hover:border-rose-400 focus:ring-4 focus:ring-rose-200 dark:focus:ring-rose-800 transition-all duration-200 font-semibold cursor-pointer"
                >
                    + Add Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Task for User</DialogTitle>
                </DialogHeader>
                <form 
                    action={handleSubmit}
                    className="space-y-4"
                >
                    {/* Hidden input for userId */}
                    <input type="hidden" name="userId" value={userId} />
                    
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" required />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" name="description" />
                    </div>
                    <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input id="dueDate" name="dueDate" type="date" />
                    </div>
                    <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Input id="priority" name="priority" placeholder="LOW, NORMAL, HIGH" />
                    </div>
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Input
                            id="status"
                            name="status"
                            placeholder="PENDING, IN_PROGRESS, COMPLETED"
                        />
                    </div>
                    
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-rose-700 text-white hover:bg-rose-800 hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-rose-200 dark:focus:ring-rose-800 transition-all duration-200 font-semibold cursor-pointer"
                        >
                            Create Task
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}
                            className="border-rose-400 text-rose-700 dark:border-rose-500 dark:text-rose-300 bg-white dark:bg-zinc-900 hover:bg-rose-100 dark:hover:bg-rose-900 hover:scale-105 hover:shadow-lg hover:border-rose-600 dark:hover:border-rose-400 focus:ring-4 focus:ring-rose-200 dark:focus:ring-rose-800 transition-all duration-200 font-semibold cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function RoleToggle({ user }: { user: { id: string; role: string } }) {
    const [isAdmin, setIsAdmin] = useState(user.role === "ADMIN");
    // You can add confirmation dialog and API call here
    return (
        <Button
            variant={isAdmin ? "destructive" : "secondary"}
            className={
                (isAdmin
                    ? "bg-rose-700 text-white hover:bg-rose-800 border-rose-400 dark:bg-rose-600 dark:hover:bg-rose-700"
                    : "border-rose-400 text-rose-700 dark:text-rose-300 dark:border-rose-500 bg-white dark:bg-zinc-900 hover:bg-rose-100 dark:hover:bg-rose-900")
                +
                " hover:scale-110 hover:shadow-xl hover:border-rose-600 dark:hover:border-rose-400 focus:ring-4 focus:ring-rose-200 dark:focus:ring-rose-800 transition-all duration-200 font-semibold cursor-pointer"
            }
            onClick={() => setIsAdmin((v) => !v)}
        >
            {isAdmin ? "Demote to User" : "Promote to Admin"}
        </Button>
    );
}