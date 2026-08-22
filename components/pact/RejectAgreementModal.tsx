type Props = {
  open: boolean;

  rejectReason: string;
  setRejectReason: (value: string) => void;

  otherReason: string;
  setOtherReason: (value: string) => void;

  onReject: () => void;
  onClose: () => void;
};

export default function RejectAgreementModal({
  open,
  rejectReason,
  setRejectReason,
  otherReason,
  setOtherReason,
  onReject,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="reject-modal">

      <h3 className="reject-modal-title">
        Reject Agreement
      </h3>

      <div className="reject-form">

        <div className="form-group">

          <label className="form-label">
            Reason
          </label>

          <select
            value={rejectReason}
            onChange={(e) =>
              setRejectReason(e.target.value)
            }
            className="form-select"
          >
            <option value="">
              Select reason
            </option>

            <option>
              Agreement terms are unclear
            </option>

            <option>
              Incorrect amount/value
            </option>

            <option>
              Incorrect dates
            </option>

            <option>
              Incorrect party information
            </option>

            <option>
              Need additional terms
            </option>

            <option>
              Legal concerns
            </option>

            <option>
              Other
            </option>
          </select>

        </div>

        {rejectReason === "Other" && (

          <div className="form-group">

            <label className="form-label">
              Additional Details
            </label>

            <textarea
              maxLength={500}
              value={otherReason}
              onChange={(e) =>
                setOtherReason(
                  e.target.value
                )
              }
              placeholder="Enter reason"
              className="form-textarea"
            />

          </div>

        )}

      </div>

      <div className="modal-actions">

        <button
          type="button"
          onClick={onClose}
          className="action-button action-secondary"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onReject}
          className="action-button action-danger"
        >
          Reject
        </button>

      </div>

    </div>
  );
}