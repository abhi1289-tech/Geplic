import DocumentField from "../document/DocumentField";

type Props = {
  category?: string;
  fields: any;
};

export default function AgreementSummary({
  category,
  fields,
}: Props) {
  return (
    <section className="agreement-summary">

      <h2 className="summary-title">
        Agreement Summary
      </h2>

      <div className="summary-content">

        {category === "Loan" && (
          <>
            <DocumentField
              label="Loan Amount"
              value={`₹${fields.loanAmount}`}
            />

            <DocumentField
              label="Repayment Date"
              value={fields.repaymentDate}
            />

            {fields.interestRate && (
              <DocumentField
                label="Interest Rate"
                value={`${fields.interestRate}%`}
              />
            )}
          </>
        )}

        {category === "Freelance / Service" && (
          <>
            <DocumentField
              label="Service"
              value={fields.serviceDescription}
            />

            <DocumentField
              label="Payment Amount"
              value={`₹${fields.paymentAmount}`}
            />

            <DocumentField
              label="Delivery Date"
              value={fields.deliveryDate}
            />
          </>
        )}

        {category === "General Promise" && (
          <DocumentField
            label="Promise"
            value={fields.promiseText}
          />
        )}

        {category === "Rent Agreement" && (
          <>
            <DocumentField
              label="Property Address"
              value={fields.propertyAddress}
            />

            <DocumentField
              label="Monthly Rent"
              value={`₹${fields.monthlyRent}`}
            />

            <DocumentField
              label="Security Deposit"
              value={`₹${fields.securityDeposit}`}
            />

            <DocumentField
              label="Start Date"
              value={fields.startDate}
            />

            <DocumentField
              label="Duration"
              value={`${fields.durationMonths} months`}
            />
          </>
        )}

      </div>

    </section>
  );
}