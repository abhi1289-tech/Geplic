"use client";

type Props = {
  title: string;
  setTitle: (value: string) => void;

  counterpartyEmail: string;
  setCounterpartyEmail: (value: string) => void;

  selfInvite: boolean;
};

export default function AgreementInfoForm({
  title,
  setTitle,
  counterpartyEmail,
  setCounterpartyEmail,
  selfInvite,
}: Props) {
  return (
    <section className="agreement-info">

      <header className="agreement-section-header">

        <h2 className="agreement-section-title">
          Agreement Info
        </h2>

      </header>

      <div className="agreement-info-grid">

        {/* Agreement Title */}

        <div className="form-group">

          <label className="form-label">
            Agreement Title
          </label>

          <input
            required
            type="text"
            placeholder="Agreement title"
            className="form-input"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

        </div>

        {/* Counterparty */}

        <div className="form-group">

          <label className="form-label">
            Other Party Email
          </label>

          <input
            required
            type="email"
            placeholder="Other party email"
            className="form-input"
            value={counterpartyEmail}
            onChange={(e) =>
              setCounterpartyEmail(
                e.target.value
              )
            }
          />

          {selfInvite && (

            <p className="form-error">
              You cannot invite yourself as the counterparty.
            </p>

          )}

        </div>

      </div>

    </section>
  );
}