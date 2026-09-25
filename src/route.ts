/**
 * Prefixes that require a NextAuth session.
 * All other pages (shop, careers, cart, search, etc.) are public.
 */
export const protectedRoutePrefixes = ["/admin", "/profile"];

/**
 * Auth pages. Logged-in NextAuth users are sent to DEFAULT_LOGIN_REDIRECT.
 */
export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/signin",
  "/forgot-password",
  "/reset-password",
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/auth/new-verification",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/profile";

export const LOGIN_PATH = "/sign-in";

export function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
