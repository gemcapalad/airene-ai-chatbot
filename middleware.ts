import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Your authentication or other middleware logic here
  const token = request.cookies.get("authtoken");

  if (token && path.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // Paths to exclude from middleware
  const excludedPaths = ["/login", "/public", "/_next/static", "/favicon.ico"];

  if (excludedPaths.some((excluded) => path.startsWith(excluded))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
