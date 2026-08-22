"use client";

import Link from "next/link";

type Props = {
  pact: any;
  category: string;
  createdDate: string;
};

export default function AgreementCard({
  pact,
  category,
  createdDate,
}: Props) {

  function getStatusClass(status: string) {

    switch (status) {

      case "completed":
      case "signed":
        return "status-success";

      case "pending":
        return "status-warning";

      case "proposed":
        return "status-info";

      case "rejected":
      case "voided":
        return "status-danger";

      default:
        return "status-default";

    }

  }

  return (

    <Link
      href={`/pact/${pact.id}`}
      className="agreement-card"
    >

      <div className="agreement-card-top">

        <span className="agreement-category">
          {category}
        </span>

        <span
          className={`agreement-status ${getStatusClass(
            pact.status
          )}`}
        >
          {pact.status}
        </span>

      </div>

      <h3 className="agreement-title">
        {pact.title || "Untitled Agreement"}
      </h3>

      {pact.counterpartyEmail && (

        <p className="agreement-meta">
          Counterparty: {pact.counterpartyEmail}
        </p>

      )}

      {pact.amount !== undefined && (

        <p className="agreement-meta">
          Amount: ₹{pact.amount}
        </p>

      )}

      {pact.description && (

        <p className="agreement-description">
          {pact.description}
        </p>

      )}

      <footer className="agreement-card-footer">

        <span>
          {createdDate}
        </span>

        <span>
          View →
        </span>

      </footer>

    </Link>

  );

}