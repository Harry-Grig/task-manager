import { getCurrentUser } from "@/auth/currentsUser";
import DashboardClient from "./dashboardClient";
import { db } from "@/utils/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser({ withFullUser: true });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const userWithTasks = await db.user.findUnique({
    where: { id: user.id },
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
  });

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

  return <DashboardClient user={fixedUser} />;
}

