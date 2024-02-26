import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  afterAuth(auth, req, evt) {

    const adminRoutes = "/admin/*";
    const role = auth.user?.publicMetadata.role;
    if(auth.userId && ( role != "administrator" && req.url.startsWith(adminRoutes))) {
      return NextResponse.redirect("/");
    }
  }
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};