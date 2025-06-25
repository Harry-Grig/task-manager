"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Menu,
  User,
  ListChecks,
  Settings,
  LogOut,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { logOut } from "@/auth/actions";

const navItems = [
  { label: "Users", icon: <User className="w-5 h-5" />, href: "/admin/users" },
  { label: "Tasks", icon: <ListChecks className="w-5 h-5" />, href: "/admin/tasks" },
];


import React from "react";

type UserType = {
  name: string | null;
  userId: string;
  email: string;
  role: "ADMIN" | "USER";
};

type DashboardClientProps = {
  user: UserType | null;
  taskStats: TaskStats;
};


type TaskStats = {
  COMPLETED: number;
  IN_PROGRESS: number;
  PENDING: number;
};




const DashboardClient = ({ user, taskStats }: DashboardClientProps ) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-neutral-50 to-zinc-200 dark:from-zinc-900 dark:via-neutral-900 dark:to-gray-900">
      {/* Sidebar */}

      <aside
        className={`fixed z-30 top-0 left-0 h-full w-64 bg-white/90 dark:bg-zinc-900/90 shadow-lg border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-4 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64`}
      >
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-bold text-foreground">
            TaskManager
          </span>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-foreground font-medium transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          onClick={logOut}
          variant="destructive"
          className="mt-auto w-full flex items-center gap-2 rounded-xl"
        >
          <LogOut className="w-5 h-5" /> Log Out
        </Button>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64">

        <header className="sticky top-0 z-20 bg-white/80 dark:bg-zinc-900/80 shadow-sm flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Open sidebar"
            >
              <Menu />
            </Button>
            <span className="text-lg font-bold text-foreground hidden md:block">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode((d) => !d)}
            >
              {darkMode ? <Sun /> : <Moon />}
            </Button>
            <div className="relative group">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User />
              </Button>
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all">
                <Link
                  href="/profile"
                  className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  Profile
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-left"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Log Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 bg-transparent">
          {/* Welcome Banner */}
          <Card className="mb-6 bg-white/80 dark:bg-zinc-900/80 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Hello, {user?.name || user?.email || "User"} 👋
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Here's what's happening today...
            </CardContent>
          </Card>

          {/* User Info Card */}
          <Card className="mb-6 bg-white/80 dark:bg-zinc-900/80 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">
                Account Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">
                    Name:
                  </span>
                  <span className="text-foreground font-bold">
                    {user?.name || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">
                    Email:
                  </span>
                  <span className="text-foreground font-bold">
                    {user?.email || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">
                    Role:
                  </span>
                  <span className="text-foreground font-bold capitalize">
                    {user?.role || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">
                    User ID:
                  </span>
                  <span className="text-foreground font-bold">
                    {user?.userId || "-"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  Tasks Completed
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold text-green-600 dark:text-green-400">
                {taskStats.COMPLETED}
              </CardContent>
            </Card>
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {taskStats.IN_PROGRESS}
              </CardContent>
            </Card>
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                {taskStats.PENDING}
              </CardContent>
            </Card>
          </div>

          {/* Latest Activity Table */}
          <Card className="shadow-md rounded-2xl mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">
                Latest Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="px-4 py-2 text-left">Task</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">Design new UI</td>
                      <td className="px-4 py-2">Completed</td>
                      <td className="px-4 py-2">2025-06-22</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-zinc-800">
                      <td className="px-4 py-2">Review PR #42</td>
                      <td className="px-4 py-2">Pending</td>
                      <td className="px-4 py-2">2025-06-23</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Update docs</td>
                      <td className="px-4 py-2">In Progress</td>
                      <td className="px-4 py-2">2025-06-24</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <Button className="rounded-2xl px-6 py-3 font-medium shadow-md bg-primary text-white hover:bg-yellow-400 hover:text-primary transition-all">
              Create New Task
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl px-6 py-3 font-medium shadow-md"
            >
              Add Project
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardClient;
