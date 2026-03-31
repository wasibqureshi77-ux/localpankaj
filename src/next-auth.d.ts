import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    phone?: string;
    address?: string;
    city?: string;
    pincode?: string;
    state?: string;
  }
  
  interface Session {
    user: {
      id: string;
      role: string;
      phone?: string;
      address?: string;
      city?: string;
      pincode?: string;
      state?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    phone?: string;
    address?: string;
    city?: string;
    pincode?: string;
    state?: string;
  }
}
