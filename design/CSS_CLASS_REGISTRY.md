# Geplic CSS Class Registry

## Source of truth

This registry is derived from the current TSX class names in the project.

**Do not invent class names.**

When a class is reused by multiple features, ownership is determined by component context.

---

## Global / shared classes

### Application shell

- `.app-header`
- `.app-header-container`
- `.app-header-actions`
- `.app-logo-button`
- `.status-page`
- `.status-page-message`

### Global buttons

- `.btn`
- `.btn-sm`
- `.btn-md`
- `.btn-lg`
- `.btn-primary`
- `.btn-secondary`

### Shared document primitives

- `.document-field-label`
- `.document-field-value`
- `.document-party-content`
- `.document-party-title`
- `.section-actions`
- `.section-content`
- `.section-divider`
- `.section-header`
- `.section-heading`
- `.section-label`
- `.section-title`

---

# Agreement Builder

## Layout

- `.agreement-builder-main`
- `.agreement-actions`

## Header

- `.agreement-header`
- `.agreement-meta`
- `.document-title`

## Overview/details

- `.agreement-lock`
- `.lock-text`
- `.agreement-type`
- `.summary-grid`
- `.agreement-details-section`
- `.empty-state`

## Parties

- `.agreement-parties`

## Terms

- `.agreement-term`
- `.term-content`
- `.term-delete`
- `.term-number`
- `.term-text`
- `.term-textarea`
- `.terms-group`
- `.terms-header`
- `.terms-list`
- `.subsection-title`
- `.add-term-button`
- `.agreement-acknowledgement`
- `.acknowledgement-text`

## Builder actions

- `.action-button`
- `.action-primary`
- `.action-secondary`
- `.action-danger`

---

# Pact Detail

## Page

- `.pact-page`
- `.pact-main`
- `.pact-header`
- `.pact-title`

## Status

- `.status-badge`
- `.status-draft`
- `.status-pending`
- `.status-completed`
- `.status-rejected`
- `.status-voided`
- `.status-default`

## Notices

- `.pact-notice`
- `.pact-notice-warning`
- `.pact-notice-danger`

## Summary

- `.agreement-summary`
- `.summary-title`
- `.summary-content`
- `.summary-grid`
- `.summary-item`
- `.summary-label`
- `.summary-value`

## Acceptance

- `.agreement-acceptance-form`
- `.acceptance-title`
- `.acceptance-description`
- `.acceptance-grid`
- `.acceptance-consent`
- `.consent-checkbox`
- `.consent-text`
- `.acceptance-submit`

## Completed

- `.agreement-completed`
- `.completed-header`
- `.completed-indicator`
- `.completed-title`
- `.completed-description`
- `.completed-grid`
- `.completed-card`
- `.completed-status`

## Rejected

- `.agreement-rejected`
- `.rejected-header`
- `.rejected-indicator`
- `.rejected-title`
- `.rejected-description`
- `.rejected-card`
- `.rejection-reason`

## Voided

- `.agreement-voided`
- `.voided-header`
- `.voided-indicator`
- `.voided-title`
- `.voided-description`

## Reject modal

- `.reject-modal`
- `.reject-modal-title`
- `.reject-form`
- `.modal-actions`

## Timeline

- `.agreement-timeline`
- `.timeline-header`
- `.timeline-indicator`
- `.timeline-title`
- `.timeline-loading`
- `.timeline-empty`
- `.timeline-list`
- `.timeline-card`
- `.timeline-card-content`
- `.timeline-dot`
- `.timeline-created`
- `.timeline-edited`
- `.timeline-sent`
- `.timeline-success`
- `.timeline-danger`
- `.timeline-event`
- `.timeline-user`
- `.timeline-date`

---

# Create Agreement

## Layout

- `.create-pact-main`
- `.create-pact-form`
- `.create-pact-header`
- `.create-pact-title`
- `.create-pact-subtitle`

## Category selector

- `.agreement-category`
- `.agreement-category-button`
- `.agreement-category-label`
- `.agreement-category-value`
- `.agreement-category-arrow`
- `.agreement-category-dropdown`
- `.agreement-category-options`

## Agreement information

- `.agreement-info`
- `.agreement-info-grid`
- `.agreement-section-header`
- `.agreement-section-title`
- `.form-error`

## Agreement details

- `.agreement-details`
- `.agreement-details-full`
- `.agreement-details-grid`

## Forms

- `.form-group`
- `.form-input`
- `.form-label`
- `.form-textarea`
- `.form-textarea-md`
- `.form-textarea-lg`
- `.form-textarea-xl`

## Create button

- `.create-agreement-button`
- `.create-agreement-button-content`
- `.create-agreement-shine`
- `.create-agreement-spinner`

---

# Dashboard

- `.dashboard-page`
- `.dashboard-actions`
- `.dashboard-hero`
- `.dashboard-hero-content`
- `.dashboard-user`
- `.dashboard-avatar`
- `.dashboard-name`
- `.dashboard-designation`
- `.dashboard-title`
- `.dashboard-stats`
- `.dashboard-stat-card`
- `.dashboard-stat-label`
- `.dashboard-stat-value`
- `.dashboard-stat-success`
- `.dashboard-stat-warning`
- `.agreement-list`
- `.agreement-card`
- `.agreement-card-top`
- `.agreement-card-footer`
- `.agreement-title`
- `.agreement-description`
- `.agreement-meta`
- `.agreement-category`
- `.dashboard-empty`
- `.dashboard-empty-icon`
- `.dashboard-empty-title`
- `.dashboard-empty-text`
- `.dashboard-recent-activity`
- `.dashboard-section-header`
- `.dashboard-section-title`
- `.dashboard-section-subtitle`
- `.dashboard-activity-list`
- `.dashboard-activity-card`
- `.dashboard-activity-content`
- `.dashboard-activity-title`
- `.dashboard-activity-description`
- `.dashboard-activity-icon`
- `.dashboard-activity-badge`

**Collision note:** `.agreement-category` is shared by Dashboard and Create Agreement. Ownership must be scoped by context.

---

# Auth

- `.auth-brand`
- `.auth-tagline`
- `.auth-footer`
- `.auth-legal`
- `.auth-legal-link`
- `.auth-link`
- `.auth-intro`
- `.auth-subtitle`
- `.auth-title`
- `.auth-page`

---

# Profile

- `.profile-main`
- `.profile-card`
- `.profile-header`
- `.profile-header-content`
- `.profile-avatar`
- `.profile-title`
- `.profile-subtitle`
- `.profile-form`
- `.profile-field`
- `.profile-input`
- `.profile-actions`

---

# Verify

- `.verify-main`
- `.verify-form`
- `.verify-title`
- `.verify-description`
- `.verify-textarea`
- `.verification-not-found`
- `.verification-not-found-title`
- `.verification-not-found-message`
- `.verification-banner`
- `.verification-banner-content`
- `.verification-banner-icon`
- `.verification-banner-text`
- `.verification-title`
- `.verification-message`
- `.verification-grid`
- `.verification-fingerprint`
- `.verification-fingerprint-value`

---

# Legal

- `.legal-page`
- `.legal-container`
- `.legal-title`

---

# Home

- `.app`
- `.hero`
- `.hero-container`
- `.hero-title`
- `.hero-description`
- `.hero-actions`
- `.features`
- `.agreement-types`
- `.lifecycle`
- `.problem`
- `.problem-container`
- `.comparison`
- `.comparison-table`
- `.coming-soon`
- `.cta-section`
- `.cta-container`
- `.site-footer`
- `.footer-container`
- `.footer-brand`
- `.footer-description`
- `.footer-nav`
- `.footer-link`
- `.footer-copyright`
- shared `.card`, `.card-grid`, `.feature-card`, `.card-title`, `.card-description`, `.section-container`, `.section-title`, `.section-description`

---

# Responsive and print

Responsive rules belong in the owning feature's responsive stylesheet.

Print rules belong in:

- `agreement/agreement-print.css`
- `14-print.css`
- `print.css`

depending on whether the rule is application print behavior or agreement-document print behavior.

---

# Class-name rule

If a class is not listed here and is not a structural/pseudo selector, do not introduce it without updating this registry first.
