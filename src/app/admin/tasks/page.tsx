import { db } from "@/utils/prisma";
import UsersWithTasksPage from "./tasksClient";

export default async function SeeAllTasks() {
  const userWithTasks = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          dueDate: true,
        }
      }
    }
  });

  // Fix: μετατρέπεις όλα τα dueDate από Date | null => string | null
  const usersWithFixedTasks = userWithTasks.map((user) => ({
    ...user,
    tasks: user.tasks.map((task) => ({
      ...task,
      dueDate: task.dueDate ? task.dueDate.toISOString() : null
    }))
  }));

  return (
    <UsersWithTasksPage users={usersWithFixedTasks} />
  );
}