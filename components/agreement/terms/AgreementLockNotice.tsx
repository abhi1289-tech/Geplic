type Props = {
  status: string;
  canEdit: boolean;
};


export default function AgreementLockNotice({
  status,
  canEdit,
}: Props) {
    const title =
  status === "voided"
    ? "Agreement Voided"
    : "Agreement Locked";
  if (canEdit) return null;

  return (
    <aside className="notice-card">

      <div className="notice-header">
        <span className="notice-icon">🛡</span>

        <h3 className="notice-title">
          {title}
        </h3>
      </div>

      <p className="notice-description">
        {status === "voided"
          ? "This agreement has been voided and can no longer be used."
          : "This agreement can no longer be edited because it has already been proposed or completed."}
      </p>

    </aside>
  );
}

/*{!canEdit && (
          <div className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4">
            <p className="font-semibold text-emerald-700">
              Agreement Locked
            </p>

            <p className="mt-1 text-sm text-emerald-600">
              {pact.status === "voided"
                ? "This agreement has been voided and can no longer be used."
                : "This agreement can no longer be edited because it has already been proposed or completed."}
            </p>
          </div>
        )}
          */

