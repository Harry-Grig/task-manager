import { type NextRequest } from "next/server";

const privateRoutes = ["/profile"];
const adminRoutes = ["/admin", "/admin/settings"];

export async function middleware(request: NextRequest) {}

async function middlewareAuth(request: NextRequest) {
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
