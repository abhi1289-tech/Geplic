const COMING_SOON = [
  "Legally Executable Agreements",
  "eSign Integration",
  "Stamp Duty Support",
  "Business Agreements",
];

export default function ComingSoonSection() {
  return (
    <section className="coming-soon">

      <div className="section-container">

        <h2 className="section-title">
          Coming Soon
        </h2>

        <div className="card-grid card-grid-2">

          {COMING_SOON.map((item) => (

            <article
              key={item}
              className="card feature-card"
            >

              <h3 className="card-title">
                {item}
              </h3>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}