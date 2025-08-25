import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard dashboard paths (extra safety besides matcher)
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const tokenCookie = request.cookies.get("authToken");
  const expiresAtCookie = request.cookies.get("authExpiresAt");

  if (!tokenCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (expiresAtCookie) {
    const expiresAtSeconds = Number(expiresAtCookie.value);
    if (!Number.isNaN(expiresAtSeconds)) {
      const nowSeconds = Math.floor(Date.now() / 1000);
      if (expiresAtSeconds <= nowSeconds) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};



