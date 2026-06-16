export function FreelanceTemplate(data: any) {
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
        FREELANCE SERVICE AGREEMENT
      </h1>

      <p>
        This Service Agreement is entered into between:
      </p>

      <div style="margin-top:20px;">

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

      <div style="margin-top:32px;">

        <h2 style="
  font-size:20px;
  font-weight:700;
  margin-bottom:12px;
  line-height:1.3;
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

      <div style="margin-top:32px;">

        <h2 style="
  font-size:20px;
  font-weight:700;
  margin-bottom:12px;
  line-height:1.3;
">
          2. TERMS
        </h2>

        <ol style="
          padding-left:18px;
          margin-top:12px;
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
          Both parties acknowledge that they have reviewed and accepted the terms of this Service Agreement.
        </p>

      </div>

    </div>

  `;
}