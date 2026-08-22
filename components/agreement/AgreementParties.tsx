import DocumentParty from "../document/DocumentParty";

import {
  DEFAULT_TEXT,
} from "@/lib/agreement/constants";

type Props = {
  pact: any;
};

function getDisplayName(
  name?: string,
  email?: string
) {
  return (
    name ||
    email ||
    DEFAULT_TEXT.unavailable
  );
}

function getDesignation(
  designation?: string,
  fallback?: string
) {
  return (
    designation ||
    fallback ||
    DEFAULT_TEXT.noDesignation
  );
}

export default function AgreementParties({
  pact,
}: Props) {

  return (
    <div className="agreement-parties">

      <DocumentParty
        title="Party A"
        name={getDisplayName(
          pact.creatorName,
          pact.creatorEmail
        )}
        designation={getDesignation(
          pact.creatorDesignation,
          DEFAULT_TEXT.creatorRole
        )}
        email={
          pact.creatorEmail ||
          DEFAULT_TEXT.unavailable
        }
      />

      <DocumentParty
        title="Party B"
        name={getDisplayName(
          pact.counterpartyName,
          pact.counterpartyEmail
        )}
        designation={getDesignation(
          pact.counterpartyDesignation,
          DEFAULT_TEXT.counterpartyRole
        )}
        email={
          pact.counterpartyEmail ||
          DEFAULT_TEXT.unavailable
        }
      />

    </div>
  );
}