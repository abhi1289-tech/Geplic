type Props = {
  pact: any;
};

export default function AgreementFooter({ pact }: Props) {
  return (
    <div className="relative z-10 mt-14 border-t border-emerald-200 pt-8">

      <div className="flex justify-between gap-6">

        {/* LEFT */}

        <div className="flex-1">

          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">
            Verification
          </p>

          <p className="mt-2 text-sm text-black/70">
            Verified on Geplic
          </p>

          <p className="mt-1 text-sm text-black/50">
            Generated on{" "}
            {pact.createdAt?.seconds
              ? new Date(
                  pact.createdAt.seconds * 1000
                ).toLocaleDateString()
              : "Not Available"}
          </p>

        </div>

        {/* RIGHT */}

        <div className="flex-1 text-right">

          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">
            SHA-256 Hash
          </p>

          <p className="mt-2 text-sm text-black/70 break-all">
            {pact.documentHash || "Not Available"}
          </p>

          <p className="mt-5 text-sm uppercase tracking-[0.3em] text-emerald-700">
            Verification Link
          </p>

          <p className="mt-2 text-sm text-black/70 break-all">
            https://geplic.com/verify/{pact.documentHash || ""}
          </p>

        </div>

      </div>

    </div>
  );
}