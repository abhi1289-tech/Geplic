export const agreementTemplates = {
  loan: `
# PERSONAL LOAN AGREEMENT

This Agreement is entered into between {{partyA}} ("Lender") and {{partyB}} ("Borrower").

Loan Amount:
₹{{loanAmount}}

Interest Rate:
{{interestRate}}%

Repayment Date:
{{repaymentDate}}

The Borrower agrees to repay the loan amount on or before the repayment date.

This agreement was created through Geplic.
`,

  freelance: `
# FREELANCE SERVICE AGREEMENT

Between {{partyA}} and {{partyB}}

Service:
{{serviceDescription}}

Payment:
₹{{paymentAmount}}

Delivery Date:
{{deliveryDate}}

Both parties agree to the above terms.
`,

  promise: `
# GENERAL AGREEMENT

Between {{partyA}} and {{partyB}}

{{promiseText}}

Both parties voluntarily agree to this commitment.
`,

  rent: `
# RENT AGREEMENT

Landlord:
{{partyA}}

Tenant:
{{partyB}}

Property:
{{propertyAddress}}

Monthly Rent:
₹{{monthlyRent}}

Security Deposit:
₹{{securityDeposit}}

Start Date:
{{startDate}}

Duration:
{{durationMonths}} months
`
};