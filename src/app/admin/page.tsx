import { db } from "@/utils/prisma"
import DashboardClient from "./adminClient"
import { getUserFromSession } from "@/auth/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Admin() {
  // Παίρνουμε τον τρέχοντα συνδεδεμένο χρήστη
  const user = await getUserFromSession(cookies())
  
  // Έλεγχος αν ο χρήστης είναι συνδεδεμένος
  if (!user) {
    redirect("/sign-in")
  }
  
  // Έλεγχος αν ο χρήστης είναι ADMIN
  if (user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  return (
    <div>
      <DashboardClient user={user} />
    </div>
  )
}