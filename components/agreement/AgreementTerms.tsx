import {
  AGREEMENT_ACKNOWLEDGEMENT,
  DEFAULT_TEXT,
} from "@/lib/agreement/constants";

import {
  AGREEMENT_STANDARD_TERMS,
} from "@/lib/agreement/terms";

import {
  addAgreementTerm,
  updateAgreementTerm,
  deleteAgreementTerm,
} from "@/lib/agreement/termHelpers";

import DocumentSection from "../document/DocumentSection";
import AgreementTerm from "./AgreementTerm";

type Props = {
  pact: any;
  additionalTerms: string[];
  mode: "view" | "edit";
  isPartyA?: boolean;
  setAdditionalTerms?: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

export default function AgreementTerms({
  pact,
  additionalTerms,
  mode,
  isPartyA = false,
  setAdditionalTerms,
}: Props) {

  const canEdit =
    mode === "edit" &&
    pact.status === "draft" &&
    isPartyA;

  const addTerm = () => {
    if (!setAdditionalTerms) return;

    setAdditionalTerms(
      addAgreementTerm(additionalTerms)
    );
  };

  const updateTerm = (
    index: number,
    value: string
  ) => {
    if (!setAdditionalTerms) return;

    setAdditionalTerms(
      updateAgreementTerm(
        additionalTerms,
        index,
        value
      )
    );
  };

  const removeTerm = (
    index: number
  ) => {
    if (!setAdditionalTerms) return;

    setAdditionalTerms(
      deleteAgreementTerm(
        additionalTerms,
        index
      )
    );
  };

  return (

    <DocumentSection title="Agreement Terms">

      {/* Standard Terms */}

      <section className="terms-group">

        <h3 className="subsection-title">
          Standard Terms
        </h3>

        <div className="terms-list">

          {AGREEMENT_STANDARD_TERMS.map(
            (term, index) => (

              <AgreementTerm
                key={index}
                number={index + 1}
                value={term}
              />

            )
          )}

        </div>

      </section>

      {/* Additional Terms */}

      <section className="terms-group">

        <div className="terms-header">

          <h3 className="subsection-title">
            Additional Terms
          </h3>

          {canEdit && (

            <button
              type="button"
              className="add-term-button"
              onClick={addTerm}
            >
              + Add Term
            </button>

          )}

        </div>

        {additionalTerms.length === 0 ? (

          <p className="empty-state">

            {canEdit
              ? DEFAULT_TEXT.noAdditionalTermsEditable
              : DEFAULT_TEXT.noAdditionalTerms}

          </p>

        ) : (

          <div className="terms-list">

            {additionalTerms.map(
              (term, index) => (

                <AgreementTerm
                  key={index}
                  number={
                    AGREEMENT_STANDARD_TERMS.length +
                    index +
                    1
                  }
                  value={term}
                  editable={canEdit}
                  onChange={(value) =>
                    updateTerm(index, value)
                  }
                  onDelete={() =>
                    removeTerm(index)
                  }
                />

              )
            )}

          </div>

        )}

      </section>

      {/* Acknowledgement */}

      <section className="agreement-acknowledgement">

        <h3 className="subsection-title">
          Acknowledgement
        </h3>

        <p className="acknowledgement-text">
          {AGREEMENT_ACKNOWLEDGEMENT}
        </p>

      </section>

    </DocumentSection>

  );

}