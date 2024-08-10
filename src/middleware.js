import NextAuth from "next-auth";
import { authConfig } from "@/app/authConfig";
import createMiddleware from 'next-intl/middleware';

// Create the NextAuth middleware
const nextAuthMiddleware = NextAuth(authConfig).auth;

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'id'],

  // Used when no locale matches
  defaultLocale: 'en'
});

// Combine the configurations for both middlewares
export const config = {
  // Combine matchers to handle both authentication and internationalized pathnames
  matcher: [
    '/((?!api|static|.*\\..*|_next).*)', // NextAuth matcher
    '/', '/(id|en)/:path*' // next-intl matcher
  ]
};

// Export the combined middleware functions
export default function middleware(req) {
  // Apply NextAuth middleware first
  const authResult = nextAuthMiddleware(req);

  // If the NextAuth middleware does not return a response, proceed with next-intl middleware
  if (!authResult) {
    return intlMiddleware(req);
  }

  return authResult;
}
