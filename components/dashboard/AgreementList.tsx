"use client";

import { formatDistanceToNow } from "date-fns";

import AgreementCard from "./AgreementCard";

type Props = {
  pacts: any[];
};

const CATEGORY_LABELS: Record<string, string> = {

  personal_loan: "PERSONAL LOAN",

  freelance_service:
    "FREELANCE / SERVICE",

  general_promise:
    "GENERAL PROMISE",

  general:
    "GENERAL PROMISE",

};

export default function AgreementList({
  pacts,
}: Props) {

  return (

    <div className="agreement-list">

      {pacts.map((pact) => {

        const category =

          CATEGORY_LABELS[
            pact.category ||
              "general_promise"
          ] || "GENERAL PROMISE";

        const createdDate =

          pact.createdAt

            ? formatDistanceToNow(
                pact.createdAt.toDate(),
                {
                  addSuffix: true,
                }
              )

            : "Unknown date";

        return (

          <AgreementCard
            key={pact.id}
            pact={pact}
            category={category}
            createdDate={createdDate}
          />

        );

      })}

    </div>

  );

}