"use server";

import { z } from "zod";
import { signInSchema, signUpSchema } from "@/utils/validation";
import { db } from "@/utils/prisma";
import { createSalt, hashPassword } from "./passwordHasher";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createUserSession } from "./session";

export async function signUp(
  unSafeData: z.infer<typeof signUpSchema>
): Promise<string | null> {
  const { data, success } = signUpSchema.safeParse(unSafeData);
  if (!success) {
    throw new Error("Invalid input data");
  }

  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser !== null) {
    throw new Error("User with this email already exists");
  }

  try {
    const salt = createSalt();

    const hashedPassword = await hashPassword(data.password, salt).toString();
    console.log("Hashed Password:", hashedPassword);

    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    if (user === null) return "unable to create user";

    // Δημιούργησε το session object που περιμένει η function
    await createUserSession(
      { userId: user.id, role: user.role },
      await cookies()
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }

  return redirect("/profile");
}

export async function signIn(unSafeData: z.infer<typeof signInSchema>) {}
