import DocumentField from "../document/DocumentField";
import DocumentSection from "../document/DocumentSection";

import {
  AGREEMENT_FIELD_LABELS,
} from "@/lib/agreement/FieldLabels";

import {
  formatAgreementValue,
} from "@/lib/agreement/Formatters";

import {
  DEFAULT_TEXT,
} from "@/lib/agreement/constants";

type Props = {
  pact: any;
  templateFields: Record<string, any>;
};

export default function AgreementDetails({
  pact,
  templateFields,
}: Props) {

  const labels =
    AGREEMENT_FIELD_LABELS[
      pact.contractType
    ] ?? {};

  const entries =
    Object.entries(labels).filter(
      ([key]) => {

        const value =
          templateFields[key];

        return (
          value !== undefined &&
          value !== null &&
          value !== ""
        );

      }
    );

  if (entries.length === 0) {
    return (
      <DocumentSection
  title="Agreement Details"
  className="agreement-details-section"
>

        <p className="empty-state">
          {DEFAULT_TEXT.noAgreementDetails}
        </p>

      </DocumentSection>
    );
  }

  return (

    <DocumentSection
  title="Agreement Details"
  className="agreement-details-section"
>

      {entries.map(([key, label]) => (

        <DocumentField
          key={key}
          label={label}
          value={formatAgreementValue(
            key,
            templateFields[key]
          )}
        />

      ))}

    </DocumentSection>

  );
}