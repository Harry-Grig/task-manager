import { db } from "@/utils/prisma"
import DashboardClient from "./adminClient"
import { getUserFromSession } from "@/auth/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Admin() {
  const user = await getUserFromSession(await cookies())
  const taskStatsRaw = await db.task.groupBy({
  by: ["status"],
  _count: { status: true },
});


const taskStats = {
  COMPLETED: 0,
  IN_PROGRESS: 0,
  PENDING: 0,
};

taskStatsRaw.forEach((entry) => {
  taskStats[entry.status] = entry._count.status;
});

  
  if (!user) {
    redirect("/sign-in")
  }
  
  if (user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  return (
    <div>
      <DashboardClient user={user} taskStats={taskStats} />
    </div>
  )
}