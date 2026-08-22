# Geplic Design Principles

## 1. One product, one visual language

Every page must feel like Geplic.

Shared:
- typography
- button geometry
- spacing rhythm
- borders
- surfaces
- shadows
- color semantics

Page-specific:
- layout
- information density
- special states
- document geometry

---

## 2. CSS ownership before visual polish

Before changing a visual property, determine which stylesheet owns the component.

A visually correct rule in the wrong stylesheet is still an architectural bug.

---

## 3. No invented classes

Existing TSX classes are the source of truth.

Do not introduce an imaginary selector because it is convenient.

If a new semantic class is genuinely necessary, update:
1. TSX
2. Component Class Registry
3. CSS Class Registry
4. owning stylesheet

---

## 4. Global CSS must remain small

Global CSS is for reusable primitives.

It must not contain:
- dashboard-specific cards
- pact-specific status panels
- builder-specific layouts
- verify-specific banners
- create-agreement category UI

---

## 5. Semantic actions

Geplic action hierarchy:

### Primary
Brand action.

### Secondary
Neutral navigation/edit/view action.

### Success
Completion/acceptance action.

### Danger
Reject/void action.

Danger should remain visually restrained on the dark application background. Red is semantic emphasis, not an unnecessarily aggressive solid fill.

---

## 6. Geometry consistency

Controls should share the same:
- height system
- border system
- typography
- focus treatment
- radius system

Current Pact destructive/success action radius: **20px**.

---

## 7. Dense document layouts

Agreement Builder is designed for serious document preparation and printing.

Desktop should prioritize:
- compact spacing
- side-by-side parties
- compact details grid
- aligned action row
- aligned status/draft information
- predictable document width

Mobile should collapse deliberately rather than simply shrinking everything.

---

## 8. Print is a first-class requirement

Agreement layouts must remain printable.

Print CSS may override:
- backgrounds
- shadows
- borders
- controls
- page breaks
- document width

It must not change application behavior.
