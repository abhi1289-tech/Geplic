import SectionCard from "./SectionCard";

export default function AgreementAcknowledgement() {
  return (
    <SectionCard className="agreement-acknowledgement">

      <header className="section-header">
        <h3 className="section-title">
          Acknowledgement
        </h3>
      </header>

      <p className="acknowledgement-text">
        Both parties acknowledge that they have carefully reviewed,understood, and
        voluntarily accepted all terms and conditions contained in this agreement.
        By providing their consent, each party confirms their intention to be bound by these terms.
      </p>

    </SectionCard>
  );
}

/*<div className="mt-10 rounded-2xl border border-emerald-200 bg-white p-6">
          <h3 className="text-xl font-bold">
            Acknowledgement
          </h3>*/