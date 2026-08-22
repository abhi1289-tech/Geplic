type Props = {
  acceptName: string;
  setAcceptName: (value: string) => void;

  acceptDesignation: string;
  setAcceptDesignation: (value: string) => void;

  acceptConsent: boolean;
  setAcceptConsent: (value: boolean) => void;

  onAccept: () => void;
};

export default function AgreementAcceptance({
  acceptName,
  setAcceptName,
  acceptDesignation,
  setAcceptDesignation,
  acceptConsent,
  setAcceptConsent,
  onAccept,
}: Props) {
  return (
    <section className="agreement-acceptance-form">

      <h3 className="acceptance-title">
        Agreement Acceptance
      </h3>

      <p className="acceptance-description">
        Confirm your identity and accept this agreement.
      </p>

      <div className="acceptance-grid">

        <div className="form-group">

          <label className="form-label">
            Full Name
          </label>

          <input
            type="text"
            value={acceptName}
            onChange={(e) =>
              setAcceptName(e.target.value)
            }
            className="form-input"
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Designation / Title
          </label>

          <input
            type="text"
            value={acceptDesignation}
            placeholder="Optional"
            onChange={(e) =>
              setAcceptDesignation(
                e.target.value
              )
            }
            className="form-input"
          />

        </div>

      </div>

      <label className="acceptance-consent">

        <input
          type="checkbox"
          checked={acceptConsent}
          onChange={(e) =>
            setAcceptConsent(
              e.target.checked
            )
          }
          className="consent-checkbox"
        />

        <span className="consent-text">
          I confirm that I have reviewed this agreement and voluntarily accept its terms.
        </span>

      </label>

      <button
        type="button"
        onClick={onAccept}
        disabled={
          !acceptConsent ||
          !acceptName.trim()
        }
        className="acceptance-submit"
      >
        Complete Agreement
      </button>

    </section>
  );
}