import { getCurrentUser } from "@/auth/currentsUser";
import DashboardClient from "./dashboardClient";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return <DashboardClient user={user} />;
}
