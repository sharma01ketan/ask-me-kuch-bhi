import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/verify",
  "/",
]);

const isPublicApiRoute = createRouteMatcher([]);

export default clerkMiddleware(async (auth, req) => {
  const userId = (await auth()).userId;
  const currentUrl = new URL(req.url);
  const isAccessingDashboard = currentUrl.pathname === "/dashboard";
  const isApiRequest = currentUrl.pathname.startsWith("/api");

  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!userId) {
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};

// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// export { default } from 'next-auth/middleware';

// export const config = {
//   matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
// };

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   // Redirect to dashboard if the user is already authenticated
//   // and trying to access sign-in, sign-up, or home page
//   if (
//     token &&
//   (url.pathname.startsWith('/sign-in') ||
//     url.pathname.startsWith('/sign-up') ||
//     url.pathname.startsWith('/verify') ||
//     url.pathname === '/')
// ) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   if (!token && url.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/sign-in', request.url));
//   }

//   return NextResponse.next();
// }
