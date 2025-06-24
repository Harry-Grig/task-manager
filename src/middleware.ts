import { type NextRequest } from "next/server";
import { getUserFromSession } from "./auth/session";
import { NextResponse } from "next/server";

const privateRoutes = ["/dashboard", "/dashboard/settings", "/dashboard/profile", "/dashboard/tasks"];
const adminRoutes = ["/admin", "/admin/tasks", "/admin/users", "/admin/users/[userId]" ,"/admin/profile" ,"/admin/settings"];

export async function middleware(request: NextRequest) {
  const res = await middlewareAuth(request) ?? NextResponse.next()
  return res
}

async function middlewareAuth(request: NextRequest) {
  const user = await getUserFromSession(request.cookies);
  
  // Check if the user is ADMIN and tries to access private routes
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    if (user === null) {
      return Response.redirect(new URL("/sign-in", request.url));
    }
    
    // If the user is ADMIN, redirect to /admin
    if (user.role === "ADMIN") {
      return Response.redirect(new URL("/admin", request.url));
    }
  }
  
  // Check for admin routes
  if (adminRoutes.includes(request.nextUrl.pathname)) {
    if (user === null) {
      return Response.redirect(new URL("/sign-in", request.url));
    }
    
    if (user.role !== "ADMIN") {
      return Response.redirect(new URL("/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};