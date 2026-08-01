type AgreementDetailsProps = {
  category: string;
  fields: Record<string, any>;
};

const FIELD_LABELS: Record<string, Record<string, string>> = {
  Loan: {
    loanAmount: "Loan Amount",
    interestRate: "Interest Rate",
    repaymentDate: "Repayment Date",
  },

  "Freelance / Service": {
    serviceDescription: "Service Description",
    paymentAmount: "Payment Amount",
    deliveryDate: "Delivery Date",
  },

  "Rent Agreement": {
    propertyAddress: "Property Address",
    monthlyRent: "Monthly Rent",
    securityDeposit: "Security Deposit",
    startDate: "Start Date",
    durationMonths: "Duration",
  },

  "General Promise": {
  },
};

export default function AgreementDetails({
  category,
  fields,
}: AgreementDetailsProps) {

  const labels = FIELD_LABELS[category] ?? {};

  const entries = Object.entries(labels);

  if (entries.length === 0) return null;

  return (
    <div className="agreement-details">

      {entries.map(([key, label]) => {

        const value = fields?.[key];

        if (
          value === undefined ||
          value === null ||
          value === ""
        ) {
          return null;
        }

        let displayValue = value;

        if (
          key === "loanAmount" ||
          key === "paymentAmount" ||
          key === "monthlyRent" ||
          key === "securityDeposit"
        ) {
          displayValue = `₹${value}`;
        }

        if (key === "interestRate") {
          displayValue = `${value}%`;
        }

        if (key === "durationMonths") {
          displayValue = `${value} Months`;
        }

        return (
          <div
            key={key}
            className="detail-row"
          >
            <span className="detail-label">
              {label}
            </span>

            <span className="detail-value">
              {displayValue}
            </span>
          </div>
        );

      })}

    </div>
  );
}