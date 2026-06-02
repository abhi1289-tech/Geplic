export function RentTemplate(data: any) {
  return `

    <div style="line-height:1.9; font-size:18px;">

      <h1 style="
        text-align:center;
        font-size:34px;
        font-weight:800;
        margin-bottom:40px;
      ">
        RENT AGREEMENT
      </h1>

      <p>
        This Rent Agreement is entered into between:
      </p>

      <div style="margin-top:30px;">

        <p>
          <strong>Owner (Party A):</strong>
          ${data.partyA || "____________"}
        </p>

        <p style="margin-top:12px;">
          <strong>Tenant (Party B):</strong>
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
          1. PROPERTY DETAILS
        </h2>

        <p>
          <strong>Property Address:</strong>
          ${data.propertyAddress || "Not Specified"}
        </p>

      </div>

      <div style="margin-top:50px;">

        <h2 style="
          font-size:24px;
          font-weight:700;
          margin-bottom:18px;
        ">
          2. RENT DETAILS
        </h2>

        <p>
          <strong>Monthly Rent:</strong>
          ₹${data.monthlyRent || 0}
        </p>

        <p style="margin-top:12px;">
          <strong>Security Deposit:</strong>
          ₹${data.securityDeposit || 0}
        </p>

      </div>

      <div style="margin-top:50px;">

        <h2 style="
          font-size:24px;
          font-weight:700;
          margin-bottom:18px;
        ">
          3. TENURE
        </h2>

        <p>
          <strong>Start Date:</strong>
          ${data.startDate || "Not Specified"}
        </p>

        <p style="margin-top:12px;">
          <strong>Duration:</strong>
          ${data.durationMonths || 0} Months
        </p>

      </div>

      <div style="margin-top:50px;">

        <h2 style="
          font-size:24px;
          font-weight:700;
          margin-bottom:18px;
        ">
          4. TERMS
        </h2>

        <ol style="
          padding-left:22px;
          margin-top:20px;
        ">

          <li>
            Tenant agrees to pay rent on time.
          </li>

          <li style="margin-top:12px;">
            Security deposit shall be handled as mutually agreed.
          </li>

          <li style="margin-top:12px;">
            Changes are allowed only while the agreement remains in draft state.
          </li>

          <li style="margin-top:12px;">
            Geplic maintains an audit trail for transparency purposes.
          </li>

        </ol>

      </div>

      <div style="margin-top:60px;">

        <h2 style="
          font-size:24px;
          font-weight:700;
          margin-bottom:18px;
        ">
          5. ACKNOWLEDGEMENT
        </h2>

        <p>
          Both parties acknowledge that they have reviewed and accepted the terms of this Rent Agreement.
        </p>

      </div>

    </div>

  `;
}