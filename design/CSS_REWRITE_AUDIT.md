# Geplic CSS Rewrite Audit

## Purpose

This is the working audit for the next CSS rewrite.

The rewrite must be based on the actual TSX classes in the project, not imagined selectors.

## Verification checklist

### Class names
- [ ] Every documented feature class exists in TSX or is a deliberate structural selector.
- [ ] No new class is introduced without updating the registries.
- [ ] Duplicate names are documented as collisions rather than blindly renamed.

### Ownership
- [ ] Global files contain only shared rules.
- [ ] Pact rules remain under `pact/*`.
- [ ] Agreement rules remain under `agreement/*`.
- [ ] Create Agreement does not globally style Dashboard.
- [ ] Print rules do not affect screen layout.

### Visual system
- [ ] Buttons use one common geometry.
- [ ] Form controls use one common geometry.
- [ ] Cards share the same spacing/radius language.
- [ ] Semantic colors are consistent.
- [ ] Pact danger/success actions use 20px radius.

### Builder
- [ ] Action row aligns with document.
- [ ] Status/Draft align.
- [ ] Parties are side-by-side on desktop.
- [ ] Details use compact grid.
- [ ] Mobile collapses safely.

### Testing
- [ ] Home
- [ ] Login
- [ ] Signup
- [ ] Dashboard
- [ ] Create Agreement
- [ ] Pact
- [ ] Agreement Builder
- [ ] Verify
- [ ] Profile
- [ ] Legal
- [ ] Print
