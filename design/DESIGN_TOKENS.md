# Geplic Design Tokens

## Purpose

Tokens are the single source of truth for reusable visual values.

Page CSS should consume tokens rather than repeatedly inventing new values.

---

## Color roles

### Brand
- primary brand color
- brand gradient
- application background

### Text
- heading
- primary text
- secondary text
- muted text

### Semantic
- success
- warning
- danger
- informational/accent

Semantic colors must be used consistently across:
- badges
- notices
- state panels
- buttons
- indicators

---

## Spacing rhythm

Use the existing token system from `02-tokens.css`.

Preferred conceptual rhythm:

`4 → 8 → 12 → 16 → 20 → 24 → 32 → 40 → 48 → 64 → 80`

Do not introduce arbitrary spacing when an existing token provides the intended value.

---

## Radius hierarchy

- small controls: token-defined small radius
- standard controls: token-defined control radius
- cards: token-defined card radius
- major surfaces: token-defined large radius
- badges/pills: `999px`

Pact semantic action buttons currently use **20px** because that value was visually confirmed as the desired geometry.

---

## Shadows

Use the existing shadow tokens.

Avoid page-specific heavy shadows unless the component is intentionally a major surface.

---

## Typography

Typography must use the global font family and typography tokens wherever possible.

Do not create page-specific font systems.
