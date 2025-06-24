import { db } from "@/utils/prisma"
import DashboardClient from "./adminClient"
import { getUserFromSession } from "@/auth/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Admin() {
  const user = await getUserFromSession(await cookies())
  
  if (!user) {
    redirect("/sign-in")
  }
  
  if (user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  return (
    <div>
      <DashboardClient user={user} />
    </div>
  )
}