import { Role } from "@/generated/prisma";
import { cookies } from "next/headers";
import z from "zod";
import crypto from "crypto";
import { redis } from "@/redis/redis";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
const COOKIE_SESSION_KEY = "custom-auth-session-id";

const sessionSchema = z.object({
  userId: z.string(),
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
  cookies: Cookies
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  await redis.set(`session:${sessionId}`, sessionSchema.parse(user), {
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
