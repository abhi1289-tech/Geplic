"use client";

type Props = {
  hash: string;
  setHash: (value: string) => void;

  loading: boolean;

  onVerify: () => void;
};

export default function VerifyForm({
  hash,
  setHash,
  loading,
  onVerify,
}: Props) {
  return (
    <section className="verify-form">

      <h1 className="verify-title">
        Verify Agreement
      </h1>

      <p className="verify-description">
        Enter an Agreement ID or Document Hash
        to verify authenticity.
      </p>

      <textarea
        value={hash}
        onChange={(e) =>
          setHash(e.target.value)
        }
        placeholder="Paste Agreement ID or Document Hash..."
        className="verify-textarea"
      />

      <button
        type="button"
        onClick={onVerify}
        disabled={loading}
        className="btn btn-primary btn-lg"
      >
        {loading
          ? "Verifying..."
          : "Verify Document"}
      </button>

    </section>
  );
}