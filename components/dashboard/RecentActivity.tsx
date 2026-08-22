export default function RecentActivity() {
  return (
    <section className="dashboard-recent-activity">

      <header className="dashboard-section-header">

        <h2 className="dashboard-section-title">
          Recent Activity
        </h2>

        <span className="dashboard-section-subtitle">
          Live audit trail
        </span>

      </header>


      <div className="dashboard-activity-list">

        <article className="dashboard-activity-card">

          <div className="dashboard-activity-icon">
            ✓
          </div>


          <div className="dashboard-activity-content">

            <div>

              <h3 className="dashboard-activity-title">
                Dashboard Ready
              </h3>

              <p className="dashboard-activity-description">
                Your agreement workspace is ready.
                Detailed audit activity will appear here.
              </p>

            </div>

          </div>


          <span className="dashboard-activity-badge">
            Beta
          </span>

        </article>

      </div>

    </section>
  );
}