export function FreelanceTemplate(data: any) {
  return `

    <div style="line-height:1.9; font-size:18px;">

      <h1 style="
        text-align:center;
        font-size:34px;
        font-weight:800;
        margin-bottom:40px;
      ">
        FREELANCE SERVICE AGREEMENT
      </h1>

      <p>
        This Service Agreement is entered into between:
      </p>

      <div style="margin-top:30px;">

        <p>
          <strong>Client (Party A):</strong>
          ${data.partyA || "____________"}
        </p>

        <p style="margin-top:12px;">
          <strong>Service Provider (Party B):</strong>
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
          1. SERVICE DETAILS
        </h2>

        <p>
          <strong>Service Description:</strong>
          ${data.serviceDescription || "Not Specified"}
        </p>

        <p style="margin-top:12px;">
          <strong>Payment Amount:</strong>
          ₹${data.paymentAmount || 0}
        </p>

        <p style="margin-top:12px;">
          <strong>Delivery Date:</strong>
          ${data.deliveryDate || "Not Specified"}
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
            Party B agrees to provide the described service.
          </li>

          <li style="margin-top:12px;">
            Party A agrees to pay the agreed amount upon completion or as mutually agreed.
          </li>

          <li style="margin-top:12px;">
            The service should be delivered on or before the delivery date.
          </li>

          <li style="margin-top:12px;">
            Changes are permitted only while the agreement remains in draft state.
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
          3. ACKNOWLEDGEMENT
        </h2>

        <p>
          Both parties acknowledge that they have reviewed and accepted the terms of this Service Agreement.
        </p>

      </div>

    </div>

  `;
}