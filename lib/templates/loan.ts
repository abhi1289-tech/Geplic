export function LoanTemplate(data: any) {
  return `

    <div style="
  line-height:1.7;
  font-size:16px;
  word-break:break-word;
  overflow-wrap:anywhere;
">

      <h1 style="
  text-align:center;
  font-weight:800;
  font-size:26px;
  margin-bottom:24px;
  line-height:1.2;
">
  LOAN AGREEMENT
</h1>

      <p>
        This Loan Agreement is entered into between:
      </p>

      <div style="margin-top:30px;">

        <p>
          <strong>Party A:</strong>
          ${data.partyA || "____________"}
        </p>

        <p style="margin-top:12px;">
          <strong>Party B:</strong>
          ${data.partyB || "____________"}
        </p>

        <p style="margin-top:12px;">
          <strong>Agreement Date:</strong>
${data.agreementDate || "Not Available"}
</p>

      </div>

      <div style="margin-top:32px;">

        <h2 style="
  font-size:20px;
  font-weight:700;
  margin-bottom:12px;
  line-height:1.3;
">
          1. LOAN DETAILS
        </h2>

        <p>
          <strong>Loan Amount:</strong>
          ₹${data.loanAmount || 0}
        </p>

        <p style="margin-top:12px;">
          <strong>Interest Rate:</strong>
          ${data.interestRate || 0}%
        </p>

        <p style="margin-top:12px;">
          <strong>Repayment Date:</strong>
          ${data.repaymentDate || "Not Specified"}
        </p>

      </div>

      <div style="margin-top:32px;">

        <h2 style="
  font-size:20px;
  font-weight:700;
  margin-bottom:12px;
  line-height:1.3;
">
          2. TERMS
        </h2>

        <ol
  style="
    padding-left:18px;
    margin-top:12px;
  "
>

${
  (data.clauses || [])
    .map(
      (term:string,index:number)=>
      `
      <li style="margin-top:12px;">
        ${term}
      </li>
      `
    )
    .join("")
}

</ol>

      </div>

      <div style="margin-top:40px;">

        <h2 style="
  font-size:20px;
  font-weight:700;
  margin-bottom:12px;
  line-height:1.3;
">
          3. ACKNOWLEDGEMENT
        </h2>

        <p>
          Both parties acknowledge that they have
          reviewed and accepted the terms of this
          Loan Agreement.
        </p>

      </div>

    </div>

  `;
}