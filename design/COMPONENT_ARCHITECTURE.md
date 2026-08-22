# Geplic Component Architecture

## Principle

Components own structure and semantic class names.

CSS owns presentation.

Pages compose components; pages should not become CSS dumping grounds.

---

## Main feature boundaries

### Home
`components/home/*`

### Auth
`components/auth/*` and shared `AuthCard`

### Dashboard
`components/dashboard/*`

### Create Agreement
`components/create-pact/*`

### Pact
`components/pact/*`

### Agreement Builder/Document
`components/agreement/*`

### Document primitives
`components/document/*`

### Verify
`components/verify/*`

### Profile
`components/profile/*`

### Legal
`components/legal/*`

---

## Agreement Builder

The Builder is composed from:
- Builder layout
- Header
- Overview/details
- Parties
- Terms
- Actions
- Acceptance
- Verification/document elements

The Builder must remain visually compact and print-oriented.

---

## Pact Detail

The Pact page composes:
- Pact header
- Status
- Summary
- Actions
- Acceptance/state panels
- Timeline

Pact-specific styles remain under `styles/pact/`.

---

## Create Agreement

Create Agreement owns:
- category selector
- agreement information
- template-specific details
- create action

It must not globally redefine Dashboard's similarly named classes.

---

## Shared component rule

A component class becomes global only when the same visual primitive is intentionally shared by multiple features.

Semantic feature classes remain scoped to their feature.
