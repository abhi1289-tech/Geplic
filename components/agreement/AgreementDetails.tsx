type AgreementDetailsProps = {
  category: string;
  fields: any;
};

export default function AgreementDetails({
  category,
  fields,
}: AgreementDetailsProps) {
  return (
    <>
      {category === "Loan" && (
        <div className="space-y-2">
          <p><strong>Loan Amount:</strong> ₹{fields.loanAmount}</p>
          <p><strong>Interest Rate:</strong> {fields.interestRate}%</p>
          <p><strong>Repayment Date:</strong> {fields.repaymentDate}</p>
        </div>
      )}

      {category === "Freelance / Service" && (
        <div className="space-y-2">
          <p><strong>Service Description:</strong> {fields.serviceDescription}</p>
          <p><strong>Payment Amount:</strong> ₹{fields.paymentAmount}</p>
          <p><strong>Delivery Date:</strong> {fields.deliveryDate}</p>
        </div>
      )}

      {category === "Rent Agreement" && (
        <div className="space-y-2">
          <p><strong>Property Address:</strong> {fields.propertyAddress}</p>
          <p><strong>Monthly Rent:</strong> ₹{fields.monthlyRent}</p>
          <p><strong>Security Deposit:</strong> ₹{fields.securityDeposit}</p>
          <p><strong>Start Date:</strong> {fields.startDate}</p>
          <p><strong>Duration:</strong> {fields.durationMonths} Months</p>
        </div>
      )}

      {category === "General Promise" && (
        <div className="space-y-2">
          <p>{fields.promiseText}</p>
        </div>
      )}
    </>
  );
}