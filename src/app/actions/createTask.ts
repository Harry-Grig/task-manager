'use server';

import { db } from "@/utils/prisma"
import { revalidatePath } from "next/cache"

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const dueDate = formData.get("dueDate") as string
  const priority = (formData.get("priority") as string)?.toUpperCase()
  const status = (formData.get("status") as string)?.toUpperCase()
  const userId = formData.get("userId") as string

  await db.task.create({
    data: {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority: priority as any,
      status: status as any,
      user: {
        connect: { id: userId }
      }
    }
  })

  revalidatePath("/admin/users")
}
