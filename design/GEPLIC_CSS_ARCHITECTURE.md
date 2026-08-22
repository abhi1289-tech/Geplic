# Geplic CSS Architecture & Ownership

## Purpose

This document is the CSS planning source of truth for Geplic.

The objective is **visual consistency without cross-page CSS leakage**.

We are not redesigning the application by inventing new class names. Existing TSX class names are the source of truth. CSS ownership must follow the actual component and route structure.

---

## 1. CSS layers

### Global foundation

| File | Responsibility |
|---|---|
| `01-reset.css` | Browser normalization/reset only |
| `02-tokens.css` | Colors, spacing, radii, shadows, typography tokens |
| `03-typography.css` | Global typography primitives |
| `04-layout.css` | Shared containers/layout primitives |
| `05-components.css` | Shared buttons, inputs, cards, badges, common UI |

These files must not contain page-specific styling.

### Shared document layer

`06-document.css`

Owns reusable document primitives used by Agreement, Pact document views, and verification/document surfaces.

It must not become a general-purpose page stylesheet.

### Agreement/Pact entry point

`07-agreement.css`

This is an **import-only entry point**.

It does not become a second agreement stylesheet.

It loads:

- `agreement/*`
- `pact/*`

### Page styles

| File | Scope |
|---|---|
| `08-home.css` | Home |
| `09-dashboard.css` | Dashboard |
| `10-auth.css` | Login/signup/auth |
| `11-profile.css` | Profile |
| `12-verify.css` | Verify |
| `13-legal.css` | Privacy/terms/legal |
| `14-print.css` | Application print behavior |
| `print.css` | Dedicated agreement print rules |
| `15-application-polish.css` | Only truly global polish that cannot belong elsewhere |

---

# 2. Agreement CSS modules

The Agreement stylesheet is intentionally split.

```text
agreement/
├── agreement-base.css
├── agreement-layout.css
├── agreement-header.css
├── agreement-parties.css
├── agreement-terms.css
├── agreement-actions.css
├── agreement-acceptance.css
├── agreement-verification.css
├── agreement-print.css
└── agreement-responsive.css
```

Ownership:

- `agreement-base.css` — agreement surface, document base, shared agreement state
- `agreement-layout.css` — builder/document layout and page geometry
- `agreement-header.css` — title/header/meta
- `agreement-parties.css` — Party A / Party B presentation
- `agreement-terms.css` — terms and term controls
- `agreement-actions.css` — builder action row
- `agreement-acceptance.css` — acceptance/signature area
- `agreement-verification.css` — verification/fingerprint/certificate UI
- `agreement-print.css` — agreement-specific print rules
- `agreement-responsive.css` — responsive overrides for Agreement

---

# 3. Pact CSS modules

```text
pact/
├── pact-page.css
├── pact-actions.css
├── pact-create.css
└── pact-responsive.css
```

Ownership:

- `pact-page.css` — Pact detail page, summary, state panels, timeline
- `pact-actions.css` — Pact action layout and Pact-specific button semantics
- `pact-create.css` — Create Agreement page
- `pact-responsive.css` — Pact/Create responsive behavior

---

# 4. Critical class collision rules

Some class names are intentionally reused by different features.

They must be scoped rather than renamed unless there is a real semantic reason to rename them.

### `agreement-category`

Used by:

- Create Agreement: `.agreement-category`
- Dashboard AgreementCard: `.agreement-category`

Therefore Create Agreement styling must be scoped to its page/component context and must never globally redefine the Dashboard version.

### `form-group`, `form-input`, `form-label`, `form-textarea`

These occur in multiple forms.

They are shared form primitives unless a feature needs a special variant.

Feature-specific variants must use a parent scope or an explicit variant class.

### `btn`, `btn-primary`, `btn-secondary`

These are global button primitives.

Do not recreate the complete button system inside individual pages.

Pact may apply semantic treatment to destructive/success actions, but it must not break the global button geometry.

---

# 5. Pact button decisions

Current Pact semantics:

- Send Offer → global primary
- Edit/View Document → global secondary
- Reject Offer → restrained destructive button
- Void Agreement → restrained destructive button
- Complete Agreement → restrained success button

Destructive buttons use a dark/glass surface with red semantic text/border rather than an aggressive solid red fill.

The Pact destructive button uses the project-approved larger radius: **20px**.

The Complete Agreement action uses the green semantic treatment and the same 20px radius.

---

# 6. Agreement Builder decisions

The Builder must preserve:

- document-width action alignment
- action row starting at the document's left edge
- action row ending at the document's right edge
- Status and Draft visually aligned
- Party A and Party B presented side-by-side where the desktop width permits
- Agreement Details displayed in a compact two-column/two-row structure rather than a long vertical list
- responsive collapse on small screens

These are layout requirements, not reasons to introduce global selectors.

---

# 7. No imaginary classes

A class may be documented only when one of these is true:

1. It exists in a current TSX `className`.
2. It is an intentional CSS pseudo/structural selector such as `::before`, `:hover`, `:focus-visible`, etc.
3. It is a documented global primitive.

Do not invent class names merely to make CSS easier.

---

# 8. CSS change workflow

Before changing a selector:

1. Search TSX for the class.
2. Identify every component using it.
3. Identify every CSS file defining it.
4. Decide whether it is global/shared or feature-specific.
5. Scope the feature-specific rule.
6. Check responsive and print files for overrides.
7. Only then modify the CSS.

---

# 9. Definition of done

A CSS change is complete only when:

- the intended page changes;
- unrelated pages do not change;
- desktop remains correct;
- mobile remains correct;
- print remains correct where applicable;
- no duplicate rule is introduced;
- no imaginary class is introduced.
