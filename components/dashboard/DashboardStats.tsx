type Props = {
  total: number;
  draft: number;
  pending: number;
  completed: number;
};

export default function DashboardStats({
  total,
  draft,
  pending,
  completed,
}: Props) {
  return (
    <section className="dashboard-stats">

  <article className="dashboard-stat-card">

    <span className="dashboard-stat-label">
      Total Agreements
    </span>

    <span className="dashboard-stat-value">
      {total}
    </span>

  </article>

  <article className="dashboard-stat-card dashboard-stat-warning">

    <span className="dashboard-stat-label">
      Draft
    </span>

    <span className="dashboard-stat-value">
      {draft}
    </span>

  </article>

  <article className="dashboard-stat-card dashboard-stat-warning">

    <span className="dashboard-stat-label">
      Pending
    </span>

    <span className="dashboard-stat-value">
      {pending}
    </span>

  </article>

  <article className="dashboard-stat-card dashboard-stat-success">

    <span className="dashboard-stat-label">
      Completed
    </span>

    <span className="dashboard-stat-value">
      {completed}
    </span>

  </article>

</section>
  );
}