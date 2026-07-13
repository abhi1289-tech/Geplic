type Props = {
  canEdit: boolean;
  isPartyA: boolean;
  pact: any;
  sending: boolean;

  onSave: () => void;
  onDownload: () => void;
  onSend: () => void;
  onVoid: () => void;
};

export default function AgreementActions({
  canEdit,
  isPartyA,
  pact,
  sending,
  onSave,
  onDownload,
  onSend,
  onVoid,
}: Props) {
  return (
    <div className="border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {canEdit && (
            <button
              onClick={onSave}
              className="
                rounded-2xl
                border
                border-white/10
                py-4
                font-medium
                transition
                hover:border-cyan-400/20
                hover:text-cyan-300
              "
            >
              Save & Continue
            </button>
          )}

          <button
            onClick={onDownload}
            className="
              rounded-2xl
              border
              border-white/10
              py-4
              font-medium
              transition
              hover:border-cyan-400/20
              hover:text-cyan-300
            "
          >
            Download PDF
          </button>

          {canEdit && (
            <button
              onClick={onSend}
              disabled={sending}
              className="
                rounded-2xl
                bg-gradient-to-r
                from-cyan-400
                to-violet-500
                py-4
                font-semibold
                text-black
                disabled:opacity-50
              "
            >
              {sending ? "Sending..." : "Send Agreement"}
            </button>
          )}

          {isPartyA &&
            (pact.status === "draft" ||
              pact.status === "pending") && (
              <button
                onClick={onVoid}
                className="
                  rounded-2xl
                  border
                  border-red-500/40
                  py-4
                  font-semibold
                  text-red-400
                  hover:bg-red-500/10
                "
              >
                Void Agreement
              </button>
            )}
        </div>
      </div>
    </div>
  );
}