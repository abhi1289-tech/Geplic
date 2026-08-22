"use client";

type Props = {
  loading: boolean;
  disabled: boolean;
};

export default function CreateAgreementButton({
  loading,
  disabled,
}: Props) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="create-agreement-button"
    >
      {loading ? (
        <span className="create-agreement-button-content">

          <span className="create-agreement-spinner" />

          Creating Agreement...

        </span>
      ) : (
        <span className="create-agreement-button-content">
          Create Agreement
        </span>
      )}

      <span className="create-agreement-shine" />
    </button>
  );
}