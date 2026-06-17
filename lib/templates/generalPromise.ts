export function generalPromiseTemplate(data:any){

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
        GENERAL PROMISE AGREEMENT
      </h1>

      <p>
        This Agreement is entered into between:
      </p>

      <div style="margin-top:20px;">
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
          1. PURPOSE
        </h2>

        <p>
          Both parties mutually acknowledge and agree
          to the promise or understanding described below.
        </p>

      </div>

      <div style="margin-top:32px;">

        <h2 style="
  font-size:20px;
  font-weight:700;
  margin-bottom:12px;
  line-height:1.3;
">
          2. AGREEMENT DETAILS
        </h2>

<p>
  ${
    data.promiseText ||
    "No agreement details provided."
  }
</p>

      </div>

      <div style="margin-top:32px;">

        <h2 style="
  font-size:20px;
  font-weight:700;
  margin-bottom:12px;
  line-height:1.3;
">
          3. GENERAL TERMS
        </h2>

        <ol style="
  padding-left:18px;
  margin-top:12px;
">

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