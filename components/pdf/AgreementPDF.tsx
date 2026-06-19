
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 11,
    backgroundColor: "#F7FFF7",
    color: "#111827",
  },

  watermark: {
  position: "absolute",
  top: 240,
  left: 20,
  fontSize: 90,
  color: "#10B981",
  opacity: 0.05,
},

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },

  agreementId: {
    color: "#6B7280",
    marginBottom: 4,
  },

  status: {
    color: "#6B7280",
    marginBottom: 20,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    marginVertical: 20,
  },

  sectionTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 6,
  marginTop: 12,
},

  partyContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },

  partyCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
  },

  label: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 6,
  },

  partyName: {
    fontSize: 11,
    fontWeight: "bold",
  },

  
agreementBox: {
  borderWidth: 1,
  borderColor: "#A7F3D0",
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  backgroundColor: "#FFFFFF",
},

acceptanceBox: {
  borderWidth: 1,
  borderColor: "#A7F3D0",
  borderRadius: 8,
  padding: 12,
  backgroundColor: "#FFFFFF",
  marginBottom: 12,
},



  term: {
    marginBottom: 8,
    lineHeight: 1.6,
  },

  footer: {
  marginTop: 8,
  borderTopWidth: 1,
  borderTopColor: "#A7F3D0",
  paddingTop: 10,
  flexDirection: "row",
  justifyContent: "space-between",
},

  footerTitle: {
    color: "#047857",
    fontSize: 10,
    marginBottom: 4,
  },

  hash: {
  width: 180,
  fontSize: 8,
  wordBreak: "break-all",
},
});

export default function AgreementPDF({
  pact,
  agreementId,
  templateFields,
  terms,
}: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <Text
  fixed
  style={styles.watermark}
>
  {pact.status === "completed"
    ? "GEPLIC VERIFIED"
    : pact.status === "pending"
    ? "PENDING"
    : pact.status === "draft"
    ? "DRAFT"
    : pact.status === "voided"
    ? "VOID"
    : "GEPLIC"}
</Text>

<Text
  fixed
  style={{
    ...styles.watermark,
    top: 520,
    
  }}
>
  {pact.status === "completed"
    ? "GEPLIC VERIFIED"
    : pact.status === "pending"
    ? "PENDING"
    : pact.status === "draft"
    ? "DRAFT"
    : pact.status === "voided"
    ? "VOID"
    : "GEPLIC"}
</Text>

        
<Text
  style={{
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "bold",
    marginBottom: 20,
  }}
>
  Geplic
</Text>

<Text style={styles.title}>
  DIGITAL AGREEMENT
</Text>



<View style={styles.acceptanceBox}>

  <Text>
    Agreement Type: {pact.contractType}
  </Text>

  <Text>
    Agreement ID: {agreementId}
  </Text>

  <Text>
    Status: {pact.status?.toUpperCase()}
  </Text>

  <Text>
    Generated On: {new Date().toLocaleDateString()}
  </Text>

</View>

<View style={styles.divider} />



        {/* PARTIES */}

        <View style={styles.partyContainer}>

          <View style={styles.partyCard}>
            <Text style={styles.label}>
              PARTY A
            </Text>

            <Text style={styles.partyName}>
              {pact.creatorName ||
                pact.creatorEmail}
            </Text>

            <Text>
              {pact.creatorDesignation ||
                "Agreement Creator"}
            </Text>
          </View>

          <View style={styles.partyCard}>
            <Text style={styles.label}>
              PARTY B
            </Text>

            <Text style={styles.partyName}>
              {pact.counterpartyName ||
                pact.counterpartyEmail}
            </Text>

            <Text>
              {pact.counterpartyDesignation ||
                "Counterparty"}
            </Text>
          </View>

        </View>

        {/* AGREEMENT DETAILS */}

        <Text style={styles.sectionTitle}>
          Agreement Details
        </Text>

        <View style={styles.agreementBox}>

          {pact.contractType === "Loan" && (
            <>
              <Text>
                Loan Amount: ₹
                {templateFields.loanAmount}
              </Text>

              <Text>
                Interest Rate:{" "}
                {templateFields.interestRate}%
              </Text>

              <Text>
  Repayment Date:{" "}
  {templateFields.repaymentDate || "Not Specified"}
</Text>
            </>
          )}

          {pact.contractType ===
            "Rent Agreement" && (
            <>
              <Text>
                Property Address:{" "}
                {templateFields.propertyAddress}
              </Text>

              <Text>
                Monthly Rent: ₹
                {templateFields.monthlyRent}
              </Text>

              <Text>
                Security Deposit: ₹
                {templateFields.securityDeposit}
              </Text>

              <Text>
                Start Date:{" "}
                {templateFields.startDate}
              </Text>

              <Text>
                Duration:{" "}
                {templateFields.durationMonths}
                {" "}Months
              </Text>
            </>
          )}

          {pact.contractType ===
            "Freelance / Service" && (
            <>
              <Text>
                Service Description:{" "}
                {templateFields.serviceDescription}
              </Text>

              <Text>
                Payment Amount: ₹
                {templateFields.paymentAmount}
              </Text>

              <Text>
                Delivery Date:{" "}
                {templateFields.deliveryDate}
              </Text>
            </>
          )}

          {pact.contractType ===
            "General Promise" && (
            <Text>
              {templateFields.promiseText}
            </Text>
          )}

        </View>

        {/* TERMS */}

        <Text style={styles.sectionTitle}>
  Terms & Conditions
</Text>

<View
  style={styles.agreementBox}
  wrap={true}
>
  {terms.map(
    (term: string, index: number) => (
      <Text
        key={index}
        style={styles.term}
      >
        {index + 1}. {term}
      </Text>
    )
  )}
</View>

        {/* ACCEPTANCE */}

        
<View wrap={false}>

  <Text style={styles.sectionTitle}>
    Digital Acceptance
  </Text>

  <View style={styles.acceptanceBox}>

    <Text>
      Creator: {pact.creatorName || pact.creatorEmail}
    </Text>

    <Text>
      Counterparty: {pact.acceptedByName || "Pending"}
    </Text>

    <Text>
      Accepted At: {
        pact.acceptedAt?.seconds
          ? new Date(
              pact.acceptedAt.seconds * 1000
            ).toLocaleString()
          : "Pending"
      }
    </Text>

  </View>

{/* FOOTER */}

<View style={styles.footer}>

  <View>
    <Text style={styles.footerTitle}>
      VERIFICATION
    </Text>

    <Text>
      Verified on Geplic
    </Text>
  </View>

  <View>

    <Text style={styles.footerTitle}>
      SHA-256 HASH
    </Text>

    <Text style={styles.hash}>
      {pact.documentHash
        ? `${pact.documentHash.substring(0, 25)}...`
        : "Not Available"}
    </Text>

    <Text
      style={[
        styles.footerTitle,
        { marginTop: 8 }
      ]}
    >
      VERIFICATION LINK
    </Text>

    <Text style={styles.hash}>
      {pact.documentHash
        ? `geplic.com/verify/${pact.documentHash.substring(0,15)}...`
        : "Not Available"}
    </Text>

  </View>

</View>
</View>


      </Page>
    </Document>
  );
}

