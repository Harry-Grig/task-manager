import { Role } from "@/generated/prisma";
import { cookies } from "next/headers";
import z, { string } from "zod";
import crypto from "crypto";
import { redis } from "@/redis/redis";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
const COOKIE_SESSION_KEY = "custom-auth-session-id";

// Διόρθωση 1: Πρόσθεσε name στο session schema
const sessionSchema = z.object({
  userId: z.string(),
  name: z.string().nullable(), // Πρόσθεσε το name
  email: z.string(), // Πρόσθεσε και email αν θες
  role: z.enum([Role.ADMIN, Role.USER]),
});

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export async function createUserSession(
  user: z.infer<typeof sessionSchema>,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  await redis.set(`session:${sessionId}`, JSON.stringify(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });
  SetCookie(sessionId, cookies);
}

function SetCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

export async function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;
  return await getUserSessionById(sessionId);
}

export async function getUserSessionById(sessionId: string) {
  const sessionData = await redis.get(`session:${sessionId}`);
  if (sessionData === null) return null;

  try {
    // Διόρθωση 2: Parse το JSON που αποθηκεύτηκε
    const user = sessionSchema.parse(sessionData);
    return user;
  } catch (error) {
    console.error("Session parsing error:", error);
    return null;
  }
}

export async function removeUserFromsession(
  cookies: Pick<Cookies, "delete" | "get">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return;

  await redis.del(`session:${sessionId}`);
  cookies.delete(COOKIE_SESSION_KEY);
}
