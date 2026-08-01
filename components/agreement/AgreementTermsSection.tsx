import AgreementSummary from "./terms/AgreementSummary";
import AgreementLockNotice from "./terms/AgreementLockNotice";
import AgreementAcknowledgement from "./terms/AgreementAcknowledgement";
import StandardTerms from "./terms/StandardTerms";
import AdditionalTerms from "./terms/AdditionalTerms";

type Props = {
  page: "summary" | "terms";
  pact: any;
  templateFields: any;
  additionalTerms: string[];
  mode: "view" | "edit";
  isPartyA?: boolean;
  setAdditionalTerms?: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

export default function AgreementTermsSection({
  page,
  pact,
  templateFields,
  additionalTerms,
  mode,
  isPartyA = false,
  setAdditionalTerms,
}: Props) {
  const canEdit =
    mode === "edit" &&
    pact.status === "draft" &&
    isPartyA;

  return (
    <section className="agreement-section">

      <header className="section-header">
        <h2 className="section-title">
          Agreement Terms
        </h2>
      </header>

      {/* PAGE GROUP 1 */}
      {page === "summary" && (

<div className="agreement-summary-group">

    <AgreementLockNotice
        status={pact.status}
        canEdit={canEdit}
    />

    <AgreementSummary
        pact={pact}
        templateFields={templateFields}
    />

</div>

)}

      {/* PAGE GROUP 2 */}
      {page === "terms" && (

<div className="agreement-page-two">

    <div className="agreement-terms-group">

        <StandardTerms />

        <AdditionalTerms
            additionalTerms={additionalTerms}
            editable={canEdit}
            onAdd={() =>
                setAdditionalTerms?.([
                    ...additionalTerms,
                    "",
                ])
            }
            onDelete={(index)=>
                setAdditionalTerms?.(
                    additionalTerms.filter((_,i)=>i!==index)
                )
            }
            onChange={(index,value)=>{

                if(!setAdditionalTerms) return;

                const updated=[...additionalTerms];

                updated[index]=value;

                setAdditionalTerms(updated);

            }}
        />

    </div>

    <AgreementAcknowledgement />

</div>

)}

    </section>
  );
}