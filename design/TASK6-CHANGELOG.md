# Geplic Task 6 — Browser Back/Forward and Session Guard

## Changes

1. `context/AuthContext.tsx`
   - Adds centralized client-side route guarding for `/dashboard`, `/profile`, `/pact/*`, and `/agreement-builder/*`.
   - Keeps protected route content hidden while Firebase auth is initializing or the user is signed out.
   - Redirects unauthenticated visits to `/login`.
   - Reloads a page restored from the browser back-forward cache (`pageshow` with `persisted`) so auth state and guards are re-evaluated.
   - Makes profile loading errors settle the auth loading state rather than leaving it stuck.
   - Preserves the existing 30-minute inactivity sign-out behavior.

2. `app/login/page.tsx`
   - Redirects already-authenticated users to `/dashboard` if Back restores the login page after a successful login.

## Expected behavior

- Sign in → Back to login → the authenticated user is redirected to dashboard; Forward does not bypass route checks.
- Sign out → Back/Forward to a protected page → protected content is blocked and the user is redirected to login.
- Directly opening or refreshing a protected client route while signed out redirects to login.

## Testing note

This archive contains source files only; the uploaded ZIP did not include `package.json` or lockfiles, so a project build could not be run from this archive. Test the listed flows in the full project before deploying. Client route guards are not a substitute for Firebase Security Rules or server-side authorization checks.
