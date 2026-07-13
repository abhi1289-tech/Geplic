type Props = {
  pact: any;
};

export default function AgreementAcceptance({ pact }: Props) {
  return (
    <div className="relative z-10 mt-14 border-t border-emerald-200 pt-6 md:pt-8">

      <h2 className="text-3xl font-bold tracking-tight">
        Digital Acceptance
      </h2>

      <div className="mt-8 grid gap-4 md:gap-8 md:grid-cols-2">

        {/* PARTY A */}

        <div className="rounded-3xl border border-gray-200 p-4 sm:p-6">

          <p className="text-sm uppercase tracking-[0.3em] text-black/50">
            Agreement Creator
          </p>

          <div className="mt-5">

            <h3 className="text-2xl font-bold">
              {pact.creatorName || "Unavailable"}
            </h3>

            <p className="mt-2 text-black/60">
              {pact.creatorDesignation || "No designation"}
            </p>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="font-semibold text-emerald-700">
                Identity Verified Through Geplic Account
              </p>
            </div>

          </div>

        </div>

        {/* PARTY B */}

        <div className="rounded-3xl border border-gray-200 p-4 sm:p-6">

          <p className="text-sm uppercase tracking-[0.3em] text-black/50">
            Counterparty Acceptance
          </p>

          {pact.status === "completed" ? (

            <div className="mt-5">

              <h3 className="text-2xl font-bold">
                {pact.acceptedByName || "Unavailable"}
              </h3>

              <p className="mt-2 text-black/60">
                {pact.acceptedByDesignation || "No designation"}
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">

                <p className="font-semibold text-emerald-700">
                  Agreement Accepted Digitally
                </p>

                <p className="mt-2 text-sm text-emerald-600">
                  {pact.acceptedAt?.seconds
                    ? new Date(
                        pact.acceptedAt.seconds * 1000
                      ).toLocaleString()
                    : "Timestamp unavailable"}
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-6 flex h-32 md:h-40 items-center justify-center rounded-2xl border border-dashed border-emerald-200 text-black/40">
              Waiting for counterparty acceptance
            </div>

          )}

        </div>

      </div>

    </div>
  );
}