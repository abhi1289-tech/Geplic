# Task 6 React error #300 fix

## Root cause
`app/login/page.tsx` returned early for `authLoading` and `user` before calling four `useState` hooks. When auth state changed between renders, React saw a different number of hooks and threw minified React error #300.

## Fix
Moved all `useState` calls above conditional returns. The authentication redirect effect and UI behavior remain in place.

## Preserved
All other files from the supplied `latest.zip` are unchanged, including Task 3 PDF browser reuse, Task 4 loading states, and Task 6 auth/back-forward changes.

## Validation
ZIP structure checked. This is a targeted source fix; a full Next.js build and browser regression test still need to be run in the project environment.
