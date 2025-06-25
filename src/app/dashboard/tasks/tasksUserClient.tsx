'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateTaskStatus } from "@/app/actions/updateTasksStatues";
import { useTransition } from "react";
import Link from "next/link";

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string | null;
};

type UserType = {
  name: string | null;
  id: string;
  email: string;
  role: "ADMIN" | "USER";
  tasks: Task[];
};

type DashboardClientProps = {
  user: UserType;
};

export default function UserTasksClient({ user }: DashboardClientProps) {
  const [tasks, setTasks] = useState(user.tasks);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (taskId: string, newStatus: string) => {
    startTransition(() => {
      updateTaskStatus(taskId, newStatus as any);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between mb-8">
        <Link href="/dashboard">
          <Button variant="outline" className="font-semibold border-rose-400 text-rose-700 dark:border-rose-500 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900 transition-all">
            ← Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-4xl font-extrabold text-center tracking-tight bg-gradient-to-r from-rose-600 via-rose-400 to-rose-700 bg-clip-text text-transparent drop-shadow-lg m-0">
          My Tasks
        </h1>
        <div />
      </div>
      {tasks.length === 0 ? (
        <Card className="bg-white/90 dark:bg-zinc-900/90 shadow-xl rounded-2xl p-12 text-center border-2 border-dashed border-rose-200 dark:border-rose-700 animate-pulse">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-zinc-700 dark:text-zinc-200">
              You have no tasks assigned.
            </CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="rounded-2xl shadow-lg bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border border-rose-200 dark:border-rose-700 hover:shadow-2xl hover:border-rose-400 dark:hover:border-rose-400 hover:scale-105 transition-all duration-200 group cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors duration-200 truncate">
                  {task.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold border capitalize shadow-sm ${
                      task.status === "COMPLETED"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : task.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-zinc-200 text-zinc-700 border-zinc-300"
                    }`}
                  >
                    {task.status.toLowerCase()}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full border font-medium text-xs shadow-sm ${
                      task.priority === "HIGH"
                        ? "bg-rose-200 text-rose-800 border-rose-300"
                        : task.priority === "NORMAL"
                        ? "bg-orange-100 text-orange-700 border-orange-200"
                        : "bg-zinc-100 text-zinc-700 border-zinc-200"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="font-medium">Due:</span>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    className="bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200 hover:text-yellow-900 transition-all duration-150 font-semibold rounded-full px-3 py-1 cursor-pointer"
                    onClick={() => handleStatusChange(task.id, "IN_PROGRESS")}
                    disabled={task.status === "IN_PROGRESS"}
                  >
                    In Progress
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 hover:text-green-900 transition-all duration-150 font-semibold rounded-full px-3 py-1 cursor-pointer"
                    onClick={() => handleStatusChange(task.id, "COMPLETED")}
                    disabled={task.status === "COMPLETED"}
                  >
                    Complete
                  </Button>
                  <Button
                    size="sm"
                    className="bg-zinc-200 text-zinc-700 border border-zinc-300 hover:bg-zinc-300 hover:text-zinc-900 transition-all duration-150 font-semibold rounded-full px-3 py-1 cursor-pointer"
                    onClick={() => handleStatusChange(task.id, "PENDING")}
                    disabled={task.status === "PENDING"}
                  >
                    Pending
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}