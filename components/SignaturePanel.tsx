import { Party } from "@/models/party";

interface Props {
  parties: Party[];
  canSign: boolean;
  onSign: () => void;
}

export function SignaturePanel({
  parties,
  canSign,
  onSign,
}: Props) {
  return (
    <div style={{ marginTop: "16px" }}>
      {parties.map((p) => (
        <div key={p.userId}>
          {p.name}: {p.signedAt ? "✅ Signed" : "⏳ Not Signed"}
        </div>
      ))}

      {canSign && (
        <button
          onClick={onSign}
          style={{ marginTop: "16px" }}
        >
          I Agree & Sign
        </button>
      )}
    </div>
  );
}
