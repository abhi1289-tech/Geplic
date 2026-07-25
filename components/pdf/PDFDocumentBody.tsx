import { Text, View } from "@react-pdf/renderer";
import { styles } from "./pdfStyles";

type Props = {
  pact: any;
  templateFields: any;
  terms: string[];
};

export default function PDFDocumentBody({
  pact,
  templateFields,
  terms,
}: Props) {
  const agreementDate = pact.createdAt?.seconds
    ? new Date(pact.createdAt.seconds * 1000).toLocaleDateString()
    : "Not Available";

  const lockedMessage =
    pact.status === "voided"
      ? "This agreement has been voided and can no longer be used."
      : "This agreement can no longer be edited because it has already been proposed or completed.";

  const renderAgreementDetails = () => {
    switch (pact.contractType) {
      case "Loan":
        return (
          <>
            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Loan Amount:</Text>{" "}
              ₹{templateFields.loanAmount}
            </Text>

            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Interest Rate:</Text>{" "}
              {templateFields.interestRate}%
            </Text>

            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Repayment Date:</Text>{" "}
              {templateFields.repaymentDate}
            </Text>
          </>
        );

      case "Freelance / Service":
        return (
          <>
            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Service Description:</Text>{" "}
              {templateFields.serviceDescription}
            </Text>

            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Payment Amount:</Text>{" "}
              ₹{templateFields.paymentAmount}
            </Text>

            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Delivery Date:</Text>{" "}
              {templateFields.deliveryDate}
            </Text>
          </>
        );

      case "Rent Agreement":
        return (
          <>
            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Property Address:</Text>{" "}
              {templateFields.propertyAddress}
            </Text>

            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Monthly Rent:</Text>{" "}
              ₹{templateFields.monthlyRent}
            </Text>

            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Security Deposit:</Text>{" "}
              ₹{templateFields.securityDeposit}
            </Text>

            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Start Date:</Text>{" "}
              {templateFields.startDate}
            </Text>

            <Text style={styles.summaryRow}>
              <Text style={styles.label}>Duration:</Text>{" "}
              {templateFields.durationMonths} Months
            </Text>
          </>
        );

      case "General Promise":
        return (
          <Text style={styles.summaryRow}>
            {templateFields.promiseText}
          </Text>
        );

      default:
        return (
          <Text style={styles.summaryRow}>
            Agreement details unavailable.
          </Text>
        );
    }
  };

  return (
    <View style={{ marginTop: 24 }}>
      {/* Agreement Terms */}

      <Text style={styles.sectionTitle}>
        Agreement Terms
      </Text>

      {/* Locked Banner */}

      {pact.status !== "draft" && (
        <View style={styles.lockedBanner} wrap={false}>
          <Text style={styles.lockedTitle}>
            Agreement Locked
          </Text>

          <Text style={styles.lockedText}>
            {lockedMessage}
          </Text>
        </View>
      )}

      {/* Agreement Summary */}

      <View style={styles.summaryCard} wrap={false}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          {(pact.contractType || "Agreement").toUpperCase()} AGREEMENT
        </Text>

        <Text style={styles.summaryRow}>
          <Text style={styles.label}>Party A:</Text>{" "}
          {pact.creatorName || pact.creatorEmail}
        </Text>

        <Text style={styles.summaryRow}>
          <Text style={styles.label}>Party B:</Text>{" "}
          {pact.counterpartyName || pact.counterpartyEmail}
        </Text>

        <Text style={styles.summaryRow}>
          <Text style={styles.label}>Agreement Date:</Text>{" "}
          {agreementDate}
        </Text>

        <View style={styles.detailsCard}>
          {renderAgreementDetails()}
        </View>
      </View>

            {/* Terms */}

      <View style={{ marginTop: 18 }}>
        {terms.map((term, index) => (
          <View
            key={index}
            style={styles.termRow}
            wrap={false}
          >
            <Text style={styles.termNumber}>
              {index + 1}.
            </Text>

            <Text style={styles.termText}>
              {term}
            </Text>
          </View>
        ))}
      </View>

      {/* Acknowledgement */}

      <View
        style={styles.ackCard}
        wrap={false}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Acknowledgement
        </Text>

        <Text
          style={{
            lineHeight: 1.7,
          }}
        >
          Both parties acknowledge that they have
          carefully reviewed, understood, and agreed
          to all terms and conditions contained in
          this agreement.
        </Text>
      </View>

      {/* Digital Acceptance */}

      <View
        style={{
          marginTop: 28,
          borderTopWidth: 1,
          borderTopColor: "#D1FAE5",
          paddingTop: 20,
        }}
      >
        <Text style={styles.sectionTitle}>
          Digital Acceptance
        </Text>

        <View style={styles.acceptanceContainer}>
                  {/* Agreement Creator */}

          <View
            style={styles.acceptanceCard}
            wrap={false}
          >
            <Text style={styles.acceptanceTitle}>
              AGREEMENT CREATOR
            </Text>

            <Text style={styles.acceptanceName}>
              {pact.creatorName || "Unavailable"}
            </Text>

            <Text style={styles.acceptanceDesignation}>
              {pact.creatorDesignation || "No designation"}
            </Text>

            <View style={styles.greenBox}>
              <Text
                style={{
                  color: "#047857",
                  fontWeight: "bold",
                  fontSize: 10,
                }}
              >
                Identity Verified Through Geplic Account
              </Text>
            </View>
          </View>

          {/* Counterparty */}

          <View
            style={styles.acceptanceCard}
            wrap={false}
          >
            <Text style={styles.acceptanceTitle}>
              COUNTERPARTY ACCEPTANCE
            </Text>

            {pact.status === "completed" ? (
              <>
                <Text style={styles.acceptanceName}>
                  {pact.acceptedByName || "Unavailable"}
                </Text>

                <Text style={styles.acceptanceDesignation}>
                  {pact.acceptedByDesignation || "No designation"}
                </Text>

                <View style={styles.greenBox}>
                  <Text
                    style={{
                      color: "#047857",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  >
                    Agreement Accepted Digitally
                  </Text>

                  <Text
                    style={{
                      marginTop: 6,
                      color: "#059669",
                      fontSize: 9,
                    }}
                  >
                    {pact.acceptedAt?.seconds
                      ? new Date(
                          pact.acceptedAt.seconds * 1000
                        ).toLocaleString()
                      : "Timestamp unavailable"}
                  </Text>
                </View>
              </>
            ) : (
              <View
                style={{
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "#A7F3D0",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#9CA3AF",
                    fontSize: 10,
                  }}
                >
                  Waiting for counterparty acceptance
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Verification Footer */}

        <View
          style={styles.footerRow}
          wrap={false}
        >
          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>
              Verification
            </Text>

            <Text style={styles.smallGrey}>
              Verified on Geplic
            </Text>

            <Text style={styles.smallGrey}>
              Generated on {agreementDate}
            </Text>
          </View>

          <View style={styles.footerRight}>
            <Text style={styles.footerTitle}>
              SHA-256 Hash
            </Text>

            <Text style={styles.hashText}>
              {pact.documentHash || "Not Available"}
            </Text>

            <Text
              style={[
                styles.footerTitle,
                { marginTop: 14 },
              ]}
            >
              Verification Link
            </Text>

            <Text style={styles.verifyLink}>
              https://geplic.com/verify/
              {pact.documentHash || ""}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}