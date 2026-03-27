import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (pathname.startsWith("/super-admin") && pathname !== "/super-admin/login") {
      if (token?.role !== "ADMIN" && token?.role !== "MANAGER") {
        return NextResponse.redirect(new URL("/super-admin/login", req.url));
      }
    }

    if (pathname.startsWith("/editor") && pathname !== "/editor/login") {
      if (token?.role !== "EDITOR") {
        return NextResponse.redirect(new URL("/editor/login", req.url));
      }
    }

    if (pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname === "/login" || pathname === "/editor/login" || pathname === "/super-admin/login" || pathname === "/register") {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/super-admin/:path*", "/editor/:path*", "/dashboard/:path*"],
};
