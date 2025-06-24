import { db } from "@/utils/prisma";
import AdminUsersPage from "./userComponents";

export default async function Page() {
  // Περίμενε το Promise από το Prisma
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      _count: {
        select: {
          tasks: true,
        },
      }
    }
  });

  // Έλεγχος αν δεν υπάρχουν users
  if (!users || users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <AdminUsersPage users={users} />
  );
}