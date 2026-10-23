import { DEFAULT_TEXT } from "@/lib/agreement/constants";

type Props = {
  canEdit: boolean;
  isPartyA: boolean;
  pact: any;

  sending: boolean;
  downloading: boolean;

  onSave: () => void;
  onDownload: () => void;
  onSend: () => void;
  onVoid: () => void;
};

export default function AgreementActions({
  canEdit,
  isPartyA,
  pact,
  sending,
  downloading,
  onSave,
  onDownload,
  onSend,
  onVoid,
}: Props) {

  const canVoid =
    isPartyA &&
    (
      pact.status === "draft" ||
      pact.status === "pending"
    );

  return (

    <section className="agreement-actions">

      <button
        type="button"
        onClick={onDownload}
        disabled={downloading}
        aria-busy={downloading}
        aria-live="polite"
        className="
          action-button
          action-secondary
        "
      >
        {downloading ? (
          <span className="pdf-download-progress">
            <span className="pdf-download-spinner" aria-hidden="true" />
            <span>{DEFAULT_TEXT.generatingPdf}</span>
          </span>
        ) : DEFAULT_TEXT.downloadPdf}
      </button>

      {canEdit && (

        <button
          type="button"
          onClick={onSave}
          className="
            action-button
            action-secondary
          "
        >
          {DEFAULT_TEXT.saveChanges}
        </button>

      )}

      {canEdit && (

        <button
          type="button"
          onClick={onSend}
          disabled={sending}
          className="
            action-button
            action-primary
          "
        >
          {sending
            ? DEFAULT_TEXT.sendingAgreement
            : DEFAULT_TEXT.sendAgreement}
        </button>

      )}

      {canVoid && (

        <button
          type="button"
          onClick={onVoid}
          className="
            action-button
            action-danger
          "
        >
          {DEFAULT_TEXT.voidAgreement}
        </button>

      )}

    </section>

  );

}