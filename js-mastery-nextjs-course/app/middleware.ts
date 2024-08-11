import { clerkMiddleware } from "@clerk/nextjs";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

console.log("Middleware is running");
