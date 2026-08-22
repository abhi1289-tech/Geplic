# Geplic Documentation Rewrite — CSS Baseline

These Markdown files are the planning baseline for the next CSS work.

## Order of authority

1. Actual TSX `className` usage
2. Current CSS files
3. Component Class Registry
4. CSS Class Registry
5. CSS Architecture
6. Design principles/tokens/specification

## Important

This documentation does **not** authorize inventing CSS classes.

The next CSS rewrite should use these documents to determine ownership, while the actual TSX remains the final source for class names.

## Key architectural rule

**Shared visual primitives are global. Feature-specific presentation is scoped.**

## Current confirmed product decisions

- Geplic is the official product name.
- Agreement CSS remains split into modules.
- Pact CSS remains split into modules.
- Pact danger buttons use restrained red.
- Pact Complete Agreement uses restrained green.
- Pact semantic action radius is 20px.
- Builder actions align to the document width.
- Builder Status/Draft alignment is required.
- Builder Party A / Party B are side-by-side on desktop.
- Builder Agreement Details uses a compact grid.
