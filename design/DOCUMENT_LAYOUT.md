# Geplic Document Layout

## Document hierarchy

```text
Agreement
├── Header
├── Overview / Details
├── Parties
├── Terms
├── Acceptance
├── Verification
└── Footer
```

## Builder

The Builder uses the document geometry while keeping editing controls outside the document content where appropriate.

Actions must align with the document width.

## Print

The document must remain printable without application chrome, interactive controls, or screen-only effects.

## Ownership

Document-specific rules belong to `06-document.css` or the Agreement modules, depending on whether they are reusable document primitives or Agreement-specific presentation.
