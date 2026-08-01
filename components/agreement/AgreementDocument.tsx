import AgreementAcceptance from "./AgreementAcceptance";
import AgreementFooter from "./AgreementFooter";
import AgreementParties from "./AgreementParties";
import AgreementTermsSection from "./AgreementTermsSection";
import AgreementPage from "./AgreementPage";

type Props = {
  pact: any;
  pactId: string;
  templateFields: any;
  additionalTerms: string[];
  mode: "view" | "edit";
  isPartyA?: boolean;
  setAdditionalTerms?: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

export default function AgreementDocument({
  pact,
  pactId,
  templateFields,
  additionalTerms,
  mode,
  isPartyA,
  setAdditionalTerms,
}: Props) {
  const watermark =
    pact.status === "draft"
      ? "DRAFT"
      : pact.status === "pending"
      ? "PENDING"
      : pact.status === "completed"
      ? "GEPLIC VERIFIED"
      : pact.status === "voided"
      ? "VOID"
      : "GEPLIC";

  return (
    <article
      id="agreement-document"
      className="agreement-document"
    >
      <div className="agreement-background" />

      <div className="agreement-watermark">
        {watermark}
      </div>
      <AgreementPage>
      <header className="agreement-header">

        <h1 className="agreement-title">
          DIGITAL AGREEMENT
        </h1>

        <div className="agreement-meta">

          <p>
            <span className="label">
              Agreement ID
            </span>

            <span className="value">
              {pactId}
            </span>
          </p>

          <p>
            <span className="label">
              Status
            </span>

            <span
              className={`agreement-status status-${pact.status}`}
            >
              {pact.status}
            </span>
          </p>

        </div>

      </header>

      <AgreementParties pact={pact} />
      <AgreementTermsSection
    page="summary"
    pact={pact}
    templateFields={templateFields}
    additionalTerms={additionalTerms}
    mode={mode}
    isPartyA={isPartyA}
    setAdditionalTerms={setAdditionalTerms}
  />

</AgreementPage>

<AgreementPage className="page-two">

  <AgreementTermsSection
    page="terms"
    pact={pact}
    templateFields={templateFields}
    additionalTerms={additionalTerms}
    mode={mode}
    isPartyA={isPartyA}
    setAdditionalTerms={setAdditionalTerms}
  />

</AgreementPage>

<AgreementPage className="signature-page">

  <AgreementAcceptance pact={pact} />

  <AgreementFooter pact={pact} />

</AgreementPage>

    </article>
  );
}