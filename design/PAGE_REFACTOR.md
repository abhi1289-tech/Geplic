# Geplic Page Refactor Rules

## Objective

Refactor CSS without changing application behavior.

The goal is:
- same functionality
- consistent visual system
- predictable CSS ownership
- no cross-page regressions
- print-safe agreement documents

---

## Page ownership

| Page/Feature | Root scope / owner |
|---|---|
| Home | `.app` / `08-home.css` |
| Dashboard | `.dashboard-page` / `09-dashboard.css` |
| Auth | `.auth-page` / `10-auth.css` |
| Profile | `.profile-page` / `11-profile.css` |
| Verify | `.verify-page` / `12-verify.css` |
| Legal | `.legal-page` / `13-legal.css` |
| Pact | `.pact-page` / `pact/*` |
| Create Agreement | `.create-pact-main` / `pact-create.css` |
| Agreement Builder | `.agreement-builder-main` / `agreement/*` |
| Print | print stylesheets |

---

## Required visual consistency

Across pages:
- same buttons
- same form controls
- same spacing language
- same border language
- same card language
- same typography
- same semantic colors

---

## Builder requirements already established

1. Action buttons align with the document width.
2. Action row starts where the document starts.
3. Action row ends where the document ends.
4. Status and Draft align visually.
5. Party A and Party B sit side-by-side on desktop.
6. Agreement Details uses a compact multi-column arrangement.
7. Mobile collapses these structures.

---

## Pact requirements already established

1. Pact background remains consistent with the application.
2. Send Offer uses the primary action.
3. View/Edit uses secondary action.
4. Reject and Void use restrained danger treatment.
5. Complete Agreement uses restrained green success treatment.
6. Pact danger/success action radius is 20px.
7. Timeline remains visually connected and readable.
8. Responsive behavior is controlled by Pact responsive CSS.

---

## Refactor workflow

Never make a global CSS change merely because a selector has the same name.

Before modifying a selector:
1. find all TSX usages;
2. find all CSS definitions;
3. identify the owner;
4. decide shared vs feature-specific;
5. scope if necessary;
6. test unrelated pages.

---

## No behavior changes

CSS refactoring must not change:
- Firebase behavior
- form submission
- routing
- agreement state
- signing
- verification
- PDF generation
- audit logging
