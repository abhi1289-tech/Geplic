type Props = {
  pact: any;
};

export default function AgreementParties({ pact }: Props) {
  return (
    <div className="relative z-10 mt-10 grid gap-8 md:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">
          Party A
        </p>

        <h2 className="mt-4 break-words text-xl sm:text-2xl font-bold">
          {pact.creatorName || pact.creatorEmail}
        </h2>

        <p className="mt-2 text-black/60">
          {pact.creatorDesignation || "Agreement Creator"}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">
          Party B
        </p>

        <h2 className="mt-4 break-words text-xl sm:text-2xl font-bold">
          {pact.counterpartyName || pact.counterpartyEmail}
        </h2>

        <p className="mt-2 text-black/60">
          {pact.counterpartyDesignation || "Counterparty"}
        </p>
      </div>
    </div>
  );
}