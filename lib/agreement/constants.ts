/* ==========================================================
   GEPlic Agreement Engine Constants
   ========================================================== */

export const APP_NAME = "Geplic";

export const DOCUMENT_TITLE =
  "DIGITAL AGREEMENT";

export const DOCUMENT_VERSION =
  "Version 1.0";

/* ==========================================================
   Agreement Status
   ========================================================== */

export const WATERMARKS: Record<string, string> = {
  draft: "DRAFT",
  pending: "PENDING",
  completed: "GEPLIC VERIFIED",
  voided: "VOID",
};

export const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  pending: "Pending",
  completed: "Completed",
  voided: "Voided",
};

/* ==========================================================
   Default Labels
   ========================================================== */

export const DEFAULT_TEXT = {

  creatorRole:
    "Agreement Creator",

  counterpartyRole:
    "Counterparty",

  unavailable:
    "Not Available",

  timestampUnavailable:
    "Timestamp unavailable",

  noAgreementDetails:
    "No agreement details available.",

  noDesignation:
    "No designation",

  noAdditionalTerms:
    "No additional terms were added.",

  noAdditionalTermsEditable:
    "No additional terms yet.",

  pendingAcceptance: "Pending Acceptance",
  awaitingAcceptance: "Awaiting Acceptance",
  termPlaceholder:
    "Enter agreement term...",

  deleteTerm:
    "Delete term",
  downloadPdf: "Download PDF",
  generatingPdf: "Generating PDF...",

  saveChanges: "Save Changes",

  sendAgreement: "Send Agreement",
  sendingAgreement: "Sending...",

  voidAgreement: "Void Agreement",
};

export const AGREEMENT_ACKNOWLEDGEMENT = `
Both parties acknowledge that they have
carefully reviewed, understood, and
voluntarily accepted every provision
of this agreement.

Each party confirms that they entered
into this agreement willingly and with
full understanding of its legal effect.
`;

/* ==========================================================
   Verification
   ========================================================== */

export const VERIFICATION_BASE_URL =
  "https://geplic.com/verify";