import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // 1. SUPER ADMIN PROTECTION
    if (pathname.startsWith("/super-admin") && pathname !== "/super-admin/login") {
      if (!token || (token.role !== "ADMIN" && token.role !== "MANAGER")) {
        return NextResponse.redirect(new URL("/super-admin/login", req.url));
      }
    }

    // 2. EDITOR PROTECTION
    if (pathname.startsWith("/editor") && pathname !== "/editor/login") {
      if (!token || token.role !== "EDITOR") {
        return NextResponse.redirect(new URL("/editor/login", req.url));
      }
    }

    // 3. USER DASHBOARD PROTECTION
    if (pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Allow public access to login pages and other non-protected routes
        if (
          pathname === "/super-admin/login" || 
          pathname === "/editor/login" || 
          pathname === "/login"
        ) {
          return true;
        }
        // General check for all other matched paths
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/super-admin/:path*", "/editor/:path*", "/dashboard/:path*"],
};
