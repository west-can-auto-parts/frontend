import NextAuth from "next-auth";
import authConfig from "./src/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  LOGIN_PATH,
  apiAuthPrefix,
  authRoutes,
  matchesPrefix,
  protectedRoutePrefixes,
} from "./src/route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const { pathname } = nextUrl;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = matchesPrefix(pathname, protectedRoutePrefixes);

  if (isApiAuthRoute) return undefined;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && isProtectedRoute) {
    const callbackUrl = `${pathname}${nextUrl.search || ""}`;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`${LOGIN_PATH}?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
