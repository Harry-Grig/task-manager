"use server";

import { z } from "zod";
import { signInSchema, signUpSchema } from "@/utils/validation";
import { db } from "@/utils/prisma";
import { comparePasswords, createSalt, hashPassword } from "./passwordHasher";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createUserSession, removeUserFromsession } from "./session";

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
    const hashedPassword = await hashPassword(data.password, salt);

    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt: salt,
      },
    });

    if (user === null) return "unable to create user";

    await createUserSession(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      await cookies()
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }

  redirect("/dashboard");
}

export async function signIn(unSafeData: z.infer<typeof signInSchema>) {
  try {
    
    const { data, success } = signInSchema.safeParse(unSafeData);
    if (!success) {
      return "Invalid input data";
    }

    const user = await db.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        salt: true,
      },
    });

    if (user === null) {
      return "User not found";
    }

    const isCorrectPassword = await comparePasswords({
      hashedPassword: user.password,
      salt: user.salt,
      password: data.password,
    });

    if (!isCorrectPassword) {
      return "Incorrect password";
    }

    // Δημιουργία session
    await createUserSession(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      await cookies()
    );


    if (user.role === 'ADMIN') {
      redirect('/admin');
    } else {
      redirect("/dashboard");
    }

  } catch (error) {
    console.error("Error during sign in:", error);
 
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error; // Re-throw redirect errors
    }
    return "Sign in failed";
  }
}

export async function logOut() {
  await removeUserFromsession(await cookies());
  redirect("/");
}