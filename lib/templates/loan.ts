export function LoanTemplate(data: any) {
  return `

    <div style="line-height:1.9; font-size:18px;">

      <h1 style="
        text-align:center;
        font-size:34px;
        font-weight:800;
        margin-bottom:40px;
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

      <div style="margin-top:50px;">

        <h2 style="
          font-size:24px;
          font-weight:700;
          margin-bottom:18px;
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

      <div style="margin-top:50px;">

        <h2 style="
          font-size:24px;
          font-weight:700;
          margin-bottom:18px;
        ">
          2. TERMS
        </h2>

        <ol style="
          padding-left:22px;
          margin-top:20px;
        ">

          <li>
            Party B agrees to repay the loan amount
            on or before the repayment date.
          </li>

          <li style="margin-top:12px;">
            Interest shall apply as stated above.
          </li>

          <li style="margin-top:12px;">
            Any modification is allowed only while
            the agreement remains in draft state.
          </li>

          <li style="margin-top:12px;">
            Geplic maintains an audit trail for
            transparency purposes.
          </li>

        </ol>

      </div>

      <div style="margin-top:60px;">

        <h2 style="
          font-size:24px;
          font-weight:700;
          margin-bottom:18px;
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