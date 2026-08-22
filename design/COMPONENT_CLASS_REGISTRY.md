# Geplic Component Class Registry

This registry maps actual TSX components to the classes they currently render.

It is intentionally component-first so CSS ownership can be verified before editing.

## Agreement

### `AgreementAcceptance.tsx`
- `.acceptance-column`
- `.acceptance-grid`

### `AgreementDetails.tsx`
- `.agreement-details-section`
- `.empty-state`

### `AgreementDocument.tsx`
- `.agreement-background`
- `.agreement-document`
- `.agreement-page-main`
- `.agreement-page-signatures`
- `.agreement-page-terms`
- `.agreement-watermark`

### `AgreementFooter.tsx`
- `.break-word`
- `.certificate-strip`
- `.document-brand`
- `.verification-grid`

### `AgreementHeader.tsx`
- `.agreement-header`
- `.agreement-meta`
- `.document-title`

### `AgreementOverview.tsx`
- `.agreement-lock`
- `.agreement-type`
- `.lock-text`
- `.summary-grid`

### `AgreementParties.tsx`
- `.agreement-parties`

### `AgreementTerm.tsx`
- `.agreement-term`
- `.term-content`
- `.term-delete`
- `.term-number`
- `.term-text`
- `.term-textarea`

### `AgreementTerms.tsx`
- `.acknowledgement-text`
- `.add-term-button`
- `.agreement-acknowledgement`
- `.empty-state`
- `.subsection-title`
- `.terms-group`
- `.terms-header`
- `.terms-list`

### `AgreementActions.tsx`
- `.action-button`
- `.action-danger`
- `.action-primary`
- `.action-secondary`
- `.agreement-actions`

### `AgreementBuilderLayout.tsx`
- `.agreement-builder-main`

---

# Create Agreement

### `AgreementCategorySelector.tsx`
- `.agreement-category`
- `.agreement-category-arrow`
- `.agreement-category-button`
- `.agreement-category-dropdown`
- `.agreement-category-label`
- `.agreement-category-options`
- `.agreement-category-value`

### `AgreementInfoForm.tsx`
- `.agreement-info`
- `.agreement-info-grid`
- `.agreement-section-header`
- `.agreement-section-title`
- `.form-error`
- `.form-group`
- `.form-input`
- `.form-label`

### `CreateAgreementButton.tsx`
- `.create-agreement-button`
- `.create-agreement-button-content`
- `.create-agreement-shine`
- `.create-agreement-spinner`

### `CreatePactLayout.tsx`
- `.create-pact-form`
- `.create-pact-header`
- `.create-pact-main`
- `.create-pact-subtitle`
- `.create-pact-title`

### Template forms

`FreelanceAgreementForm.tsx`, `LoanAgreementForm.tsx`, `RentAgreementForm.tsx`:
- `.agreement-details`
- `.agreement-details-full`
- `.agreement-details-grid`
- `.agreement-section-header`
- `.agreement-section-title`
- `.form-group`
- `.form-input`
- `.form-label`
- `.form-textarea` where applicable
- `.form-textarea-md` / `.form-textarea-lg` where applicable

`GeneralPromiseForm.tsx`:
- `.agreement-details`
- `.agreement-section-header`
- `.agreement-section-title`
- `.form-group`
- `.form-textarea`
- `.form-textarea-xl`

---

# Pact

### `PactActions.tsx`
- `.pact-actions`
- `.pact-action-group`
- `.btn`
- `.btn-md`
- `.btn-primary`
- `.btn-secondary`
- `.btn-danger`

### `PactHeader.tsx`
- `.pact-header`
- `.pact-title`
- `.pact-notice`
- `.pact-notice-warning`
- `.pact-notice-danger`

### `PactLayout.tsx`
- `.pact-main`

### `AgreementSummary.tsx`
- `.agreement-summary`
- `.summary-content`
- `.summary-title`

### `AgreementAcceptance.tsx`
- `.agreement-acceptance-form`
- `.acceptance-title`
- `.acceptance-description`
- `.acceptance-grid`
- `.acceptance-consent`
- `.consent-checkbox`
- `.consent-text`
- `.acceptance-submit`
- `.form-group`
- `.form-input`
- `.form-label`

### State panels

Completed:
- `.agreement-completed`
- `.completed-header`
- `.completed-indicator`
- `.completed-title`
- `.completed-description`
- `.completed-grid`
- `.completed-card`

Rejected:
- `.agreement-rejected`
- `.rejected-header`
- `.rejected-indicator`
- `.rejected-title`
- `.rejected-description`
- `.rejected-card`
- `.rejection-reason`

Voided:
- `.agreement-voided`
- `.voided-header`
- `.voided-indicator`
- `.voided-title`
- `.voided-description`

### `RejectAgreementModal.tsx`
- `.reject-modal`
- `.reject-modal-title`
- `.reject-form`
- `.form-group`
- `.form-label`
- `.form-select`
- `.form-textarea`
- `.modal-actions`
- `.action-button`
- `.action-danger`
- `.action-secondary`

### `StatusBadge.tsx`
- `.status-badge`
- `.status-draft`
- `.status-pending`
- `.status-completed`
- `.status-default`
- `.status-rejected`
- `.status-voided`

---

# Timeline

### `AgreementTimeline.tsx`
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
- `.timeline-event`
- `.timeline-user`
- `.timeline-date`

Timeline state variants:
- `.timeline-created`
- `.timeline-edited`
- `.timeline-sent`
- `.timeline-success`
- `.timeline-danger`

---

# Collision watchlist

These names occur in more than one feature and must not be globally restyled without checking usage:

- `.agreement-category`
- `.form-group`
- `.form-input`
- `.form-label`
- `.form-textarea`
- `.empty-state`
- `.summary-grid`
- `.acceptance-grid`
- `.verification-grid`
- `.card`
- `.section-title`
- `.section-container`
- `.btn`
- `.btn-primary`
- `.btn-secondary`

The correct response to a collision is **scoping or a documented shared primitive**, not random renaming.
