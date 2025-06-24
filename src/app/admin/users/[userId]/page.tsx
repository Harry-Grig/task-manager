import { db } from "@/utils/prisma";
import UserTasksAdminUI from "./userTaskClient";

export default async function UserTaskPage({ params }: { params: { userId: string } }) {
    const { userId } = await params;
    
    // Get user data
    const user = await db.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            _count: {
                select: {
                    tasks: true,
                }
            }
        }
    });

    // Get user's tasks
    const tasks = await db.task.findMany({
        where: { userId: userId },
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
            updatedAt: true
        },
        orderBy: { createdAt: 'desc' }
    });

    // Check if user exists
    if (!user) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">User not found</h1>
                    <p className="text-gray-600">The user with ID {userId} does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <UserTasksAdminUI user={user} tasks={tasks} />
    );
}