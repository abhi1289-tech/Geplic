# Geplic CSS Isolation Audit

## Status

This document replaces the earlier planning/audit assumptions.

The project contains:
- global CSS
- shared document CSS
- split Agreement CSS
- split Pact CSS
- page CSS
- print CSS

## Main risks identified

### 1. Duplicate semantic names

Examples:
- `.agreement-category`
- `.empty-state`
- `.form-group`
- `.form-input`
- `.form-label`
- `.form-textarea`
- `.summary-grid`
- `.acceptance-grid`
- `.verification-grid`

These names are not automatically errors. Their usage must be checked before changing them.

### 2. Global leakage

Feature-specific rules must not be placed in global component styles merely because the class name is common.

### 3. Multiple button systems

Global buttons and feature-specific action buttons must have clear ownership.

Pact currently uses the global `.btn` family for standard actions and feature-specific semantic treatment for danger/success actions.

### 4. Responsive duplication

Responsive rules must remain with the owning feature whenever possible.

---

## Required cleanup policy

Do not:
- add `!important` to fight ownership;
- duplicate complete button systems;
- rename classes without a component reason;
- invent classes;
- move page rules into global files.

Do:
- scope feature selectors;
- keep shared primitives global;
- maintain the split Agreement/Pact architecture;
- update registries when class ownership changes.

---

## Current confirmed visual changes

- Pact danger buttons use restrained red treatment.
- Pact Complete Agreement uses restrained green treatment.
- Pact semantic action radius is 20px.
- Agreement Builder actions align with the document width.
- Builder Status/Draft alignment has been corrected.
- Builder Party A / Party B are intended to be side-by-side on desktop.
- Agreement Details is intended to use a compact multi-column arrangement.
