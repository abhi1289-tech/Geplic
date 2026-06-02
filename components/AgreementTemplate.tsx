import { TemplateData } from "@/models/templateData";

interface Props {
  data: TemplateData;
  canEdit: boolean;
  onChange: <K extends keyof TemplateData>(
    key: K,
    value: TemplateData[K]
  ) => void;
}

export function AgreementTemplate({
  data,
  canEdit,
  onChange,
}: Props) {
  return (
    <>
      <p>
        Monthly Rent: ₹
        {canEdit ? (
          <input
            type="number"
            value={data.amount}
            onChange={(e) =>
              onChange("amount", Number(e.target.value))
            }
          />
        ) : (
          <strong>{data.amount}</strong>
        )}
      </p>

      <p>
        Start Date:{" "}
        {canEdit ? (
          <input
            type="date"
            value={data.startDate}
            onChange={(e) =>
              onChange("startDate", e.target.value)
            }
          />
        ) : (
          <strong>{data.startDate}</strong>
        )}
      </p>

      <p>Duration: {data.duration}</p>
    </>
  );
}
