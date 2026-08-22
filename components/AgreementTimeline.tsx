"use client";

import { useEffect, useState } from "react";
import {
  getAuditLogs,
  type AuditLog,
} from "@/services/auditService";
type Props = {
  pactId: string;
};

const ACTIONS: Record<
  string,
  {
    title: string;
    color: string;
  }
> = {
  PACT_CREATED: {
    title: "Pact Created",
    color: "timeline-created",
  },

  PACT_EDITED: {
    title: "Agreement Edited",
    color: "timeline-edited",
  },

  OFFER_SENT: {
    title: "Offer Sent",
    color: "timeline-sent",
  },

  OFFER_ACCEPTED: {
    title: "Offer Accepted",
    color: "timeline-success",
  },

  OFFER_REJECTED: {
    title: "Offer Rejected",
    color: "timeline-danger",
  },

  AGREEMENT_COMPLETED: {
    title: "Agreement Completed",
    color: "timeline-success",
  },

  AGREEMENT_VOIDED: {
    title: "Agreement Voided",
    color: "timeline-danger",
  },
};

function formatDate(timestamp: any) {
  if (!timestamp?.seconds) {
    return "Unknown";
  }

  return new Date(
    timestamp.seconds * 1000
  ).toLocaleString();
}

export default function AgreementTimeline({
  pactId,
}: Props) {

  const [logs, setLogs] =
  useState<AuditLog[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadLogs() {

      const items = (
  await getAuditLogs(pactId)
).filter(
  (log) =>
    log.action !==
    "AGREEMENT_VIEWED"
);

setLogs(items);
setLoading(false);

    }

    loadLogs();

  }, [pactId]);

  if (loading) {
    return (
      <section className="timeline-loading">
        Loading agreement timeline...
      </section>
    );
  }

  return (

    <section className="agreement-timeline">

      <header className="timeline-header">

        <div className="timeline-indicator" />

        <h2 className="timeline-title">
          Agreement Timeline
        </h2>

      </header>

      {logs.length === 0 && (

        <div className="timeline-empty">

          No agreement activity yet.

        </div>

      )}

      <div className="timeline-list">

        {logs.map(log => {

          const config =
            ACTIONS[log.action] ?? {
              title: log.action,
              color: "",
            };

          return (

            <article
              key={log.id}
              className="timeline-card"
            >

              <div
                className={`timeline-dot ${config.color}`}
              />

              <div className="timeline-card-content">

                <div>

                  <p className="timeline-event">

                    {config.title}

                  </p>

                  <p className="timeline-user">

                    {log.userEmail}

                  </p>

                </div>

                <div className="timeline-date">

                  {formatDate(log.createdAt)}

                </div>

              </div>

            </article>

          );

        })}

      </div>

    </section>

  );

}