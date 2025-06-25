"use server";

import { db } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskStatus(taskId: string, newStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED") {
  try {
    await db.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });

    revalidatePath("/dashboard/tasks");
  } catch (error) {
    console.error("Error updating task status:", error);
    throw new Error("Could not update task status");
  }
}
