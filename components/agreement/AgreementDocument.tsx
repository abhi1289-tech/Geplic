import AgreementAcceptance from "./AgreementAcceptance";
import AgreementDetails from "./AgreementDetails";
import AgreementFooter from "./AgreementFooter";
import AgreementHeader from "./AgreementHeader";
import AgreementOverview from "./AgreementOverview";
import AgreementPage from "./AgreementPage";
import AgreementParties from "./AgreementParties";
import AgreementTerms from "./AgreementTerms";

import { getAgreementWatermark } from "@/lib/agreement/Watermark";

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
  isPartyA = false,
  setAdditionalTerms,
}: Props) {

  return (

    <article className="agreement-document">

      {/* Background */}

      <div className="agreement-background" />

      {/* Watermark */}

      <div className="agreement-watermark">
        {getAgreementWatermark(
          pact.status
        )}
      </div>

      {/* ==========================
          PAGE 1
      ========================== */}

      <AgreementPage className="agreement-page-main">

        <AgreementHeader
          pact={pact}
          pactId={pactId}
        />

        <AgreementParties
          pact={pact}
        />

        <AgreementOverview
          pact={pact}
          templateFields={templateFields}
          mode={mode}
          isPartyA={isPartyA}
        />

        <AgreementDetails
          pact={pact}
          templateFields={templateFields}
        />

      </AgreementPage>

      {/* ==========================
          PAGE 2
      ========================== */}

      <AgreementPage className="agreement-page-terms">

        <AgreementTerms
          pact={pact}
          additionalTerms={additionalTerms}
          mode={mode}
          isPartyA={isPartyA}
          setAdditionalTerms={setAdditionalTerms}
        />

      </AgreementPage>

      {/* ==========================
          PAGE 3
      ========================== */}

      <AgreementPage className="agreement-page-signatures">

        <AgreementAcceptance
          pact={pact}
        />

        <AgreementFooter
          pact={pact}
        />

      </AgreementPage>

    </article>

  );

}