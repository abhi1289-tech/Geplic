"use client";

type Props = {
  onCreate: () => void;
};

export default function EmptyState({
  onCreate,
}: Props) {
  return (
    <section className="dashboard-empty">

      <div className="dashboard-empty-icon">
        📄
      </div>

      <h3 className="dashboard-empty-title">
        No agreements yet
      </h3>

      <p className="dashboard-empty-text">
        Create your first digital agreement
        and start building verified trust.
      </p>

      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={onCreate}
      >
        Create First Agreement
      </button>

    </section>
  );
}