# Geplic Agreement Blueprint

## Purpose

The Agreement system presents an agreement as a structured, serious, readable document.

## Main surfaces

- Agreement Builder
- Agreement Document
- Agreement Parties
- Agreement Terms
- Acceptance
- Verification
- Print

## Builder layout requirements

Desktop:
- compact document width
- aligned action row
- Status/Draft alignment
- Party A and Party B side-by-side
- Agreement Details in a compact grid

Mobile:
- stack columns
- preserve readable spacing
- keep actions usable

## Styling rule

Agreement CSS remains split into dedicated modules under `app/styles/agreement/`.

Do not merge the modules into one giant stylesheet.
