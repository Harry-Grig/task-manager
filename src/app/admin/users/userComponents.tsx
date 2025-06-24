"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

// Dummy users array for demonstration. Replace with your own data fetching logic.
const users = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "USER",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "ADMIN",
    },
];

export default function AdminUsersPage() {
    // You can remove this dummy data and fetch your users as needed
    return (
        <div className="max-w-3xl mx-auto py-10 space-y-6">
            <h1 className="text-3xl font-bold mb-6 text-rose-700 dark:text-rose-400">
                Manage Users
            </h1>
            <div className="space-y-4">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        className="p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900 space-y-2 border border-rose-200 dark:border-rose-800"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                                    {user.name}
                                </p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {user.email}
                                </p>
                                <p className="text-sm capitalize text-rose-700 dark:text-rose-400">
                                    Role: {user.role.toLowerCase()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <AddTaskDialog userId={user.id} />
                                <Link
                                    href={`/admin/users/${user.id}`}
                                >
                                    <Button
                                        variant="outline"
                                        className="border-rose-400 text-rose-700 dark:border-rose-500 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900"
                                    >
                                        View Tasks
                                    </Button>
                                </Link>
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
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="secondary"
                    className="text-rose-700 border-rose-400 dark:text-rose-300 dark:border-rose-500"
                >
                    + Add Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Task for User</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
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
                </form>
                <DialogFooter>
                    <Button
                        type="submit"
                        className="bg-rose-700 text-white hover:bg-rose-800"
                    >
                        Create Task
                    </Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
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
                isAdmin
                    ? "bg-rose-700 text-white hover:bg-rose-800 border-rose-400 dark:bg-rose-600 dark:hover:bg-rose-700"
                    : "border-rose-400 text-rose-700 dark:text-rose-300 dark:border-rose-500"
            }
            onClick={() => setIsAdmin((v) => !v)}
        >
            {isAdmin ? "Demote to User" : "Promote to Admin"}
        </Button>
    );
}
