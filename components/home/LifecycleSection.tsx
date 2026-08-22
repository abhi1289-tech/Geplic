const LIFECYCLE = [
  {
    title: "Draft",
    description: "Agreement created and editable.",
    status: "draft",
  },
  {
    title: "Pending Acceptance",
    description: "Offer sent to the counterparty.",
    status: "pending",
  },
  {
    title: "Completed",
    description: "Agreement digitally accepted.",
    status: "completed",
  },
  {
    title: "Voided",
    description: "Agreement permanently cancelled.",
    status: "voided",
  },
];

export default function LifecycleSection() {
  return (
    <section className="lifecycle">
      <div className="section-container">
        <h2 className="section-title">
          Agreement Lifecycle
        </h2>

        <div className="card-grid card-grid-4">
          {LIFECYCLE.map((item) => (
            <article
              key={item.status}
              className={`card status-card status-${item.status}`}
            >
              <h3 className="card-title">
                {item.title}
              </h3>

              <p className="card-description">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}