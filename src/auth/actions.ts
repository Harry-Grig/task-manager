import { z } from "zod";
import { signUpSchema } from "@/utils/validation";
import { db } from "@/utils/prisma";
import { hashPassword } from "./passwordHasher";
import { redirect } from "next/navigation";

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

  const hashedPassword = await hashPassword(data.password, "salt");
  console.log("Hashed Password:", hashedPassword);

  return null;
}
