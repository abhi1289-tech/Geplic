export function generalPromiseTemplate(data:any){

  return `

    <div style="line-height:1.9; font-size:18px;">

      <h1 style="
        text-align:center;
        font-size:34px;
        font-weight:800;
        margin-bottom:40px;
      ">
        GENERAL PROMISE AGREEMENT
      </h1>

      <p>
        This Agreement is entered into between:
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
          1. PURPOSE
        </h2>

        <p>
          Both parties mutually acknowledge and agree
          to the promise or understanding described below.
        </p>

      </div>

      <div style="margin-top:50px;">

        <h2>
  2. AGREEMENT DETAILS
</h2>

<p>
  ${
    data.promiseText ||
    "No agreement details provided."
  }
</p>

      </div>

      <div style="margin-top:50px;">

        <h2 style="
          font-size:24px;
          font-weight:700;
          margin-bottom:18px;
        ">
          3. GENERAL TERMS
        </h2>

        <ol style="
          padding-left:22px;
          margin-top:20px;
        ">

          <li>
            Both parties voluntarily agree to the terms
            stated in this agreement.
          </li>

          <li style="margin-top:12px;">
            Any modification is only permitted while
            the agreement remains in draft state.
          </li>

          <li style="margin-top:12px;">
            Once the agreement is proposed or signed,
            editing becomes restricted.
          </li>

          <li style="margin-top:12px;">
            Geplic maintains a digital audit trail
            for transparency purposes.
          </li>

          <li style="margin-top:12px;">
            Both parties acknowledge that this agreement
            represents mutual consent.
          </li>

        </ol>

      </div>

      <div style="margin-top:60px;">

        <h2 style="
          font-size:24px;
          font-weight:700;
          margin-bottom:18px;
        ">
          4. ACKNOWLEDGEMENT
        </h2>

        <p>
          By signing this agreement, both parties confirm
          that they have read and understood the terms.
        </p>

      </div>

    </div>

  `;

}