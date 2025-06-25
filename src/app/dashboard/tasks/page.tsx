import { getCurrentUser } from "@/auth/currentsUser";
import { db } from "@/utils/prisma";
import UserTasksClient from "./tasksUserClient";


export default async function UserTasksServer() {
    const user = await getCurrentUser({ withFullUser: true });
    const userWithTasks = await db.user.findUnique({
            where: { id: user?.id },
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
        },
      },
    },
    })
    if (!userWithTasks) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not found.</p>
      </div>
    );
  }

  const fixedUser = {
    ...userWithTasks,
    tasks: userWithTasks.tasks.map((task) => ({
      ...task,
      dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    })),
  };


  return <UserTasksClient user={fixedUser} />;
}