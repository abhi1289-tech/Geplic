const FEATURES = [
  "Digital Acceptance",
  "Agreement Timeline",
  "Audit Logs",
  "Verification Hash",
  "Cloud Storage",
  "Secure Records",
];

export default function FeaturesSection() {
  return (
    <section className="features">

      <div className="section-container">

        <h2 className="section-title">
          Platform Features
        </h2>

        <div className="card-grid card-grid-3">

          {FEATURES.map((feature) => (

            <article
              key={feature}
              className="card feature-card"
            >

              <h3 className="card-title">
                {feature}
              </h3>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}