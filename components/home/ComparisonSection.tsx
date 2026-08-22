const COMPARISON = [
  {
    whatsapp: "Messages can be deleted",
    geplic: "Permanent audit trail",
  },
  {
    whatsapp: "No agreement verification",
    geplic: "Hash verification",
  },
  {
    whatsapp: "Hard to track approvals",
    geplic: "Digital acceptance records",
  },
];

export default function ComparisonSection() {
  return (
    <section className="comparison">

      <div className="section-container">

        <h2 className="section-title">
          Why Use Geplic?
        </h2>

        <table className="comparison-table">

          <thead>

            <tr>

              <th>WhatsApp</th>

              <th>Geplic</th>

            </tr>

          </thead>

          <tbody>

            {COMPARISON.map((row) => (

              <tr key={row.whatsapp}>

                <td>{row.whatsapp}</td>

                <td>{row.geplic}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}