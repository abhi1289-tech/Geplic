import { Text, View } from "@react-pdf/renderer";
import { styles } from "./pdfStyles";

type Props = {
  pact: any;
};

export default function PDFParties({ pact }: Props) {
  return (
    <>
      <Text style={styles.sectionTitle}>
        Parties
      </Text>

      <View style={styles.partyContainer}>

        {/* Party A */}

        <View style={styles.partyCard}>

          <Text style={styles.infoLabel}>
            PARTY A
          </Text>

          <Text style={styles.infoValue}>
            {pact.creatorName || pact.creatorEmail}
          </Text>

          <Text style={styles.infoLabel}>
            Designation
          </Text>

          <Text>
            {pact.creatorDesignation ||
              "Agreement Creator"}
          </Text>

          <Text
            style={[
              styles.infoLabel,
              { marginTop: 12 }
            ]}
          >
            Email
          </Text>

          <Text>
            {pact.creatorEmail}
          </Text>

        </View>

        {/* Party B */}

        <View style={styles.partyCard}>

          <Text style={styles.infoLabel}>
            PARTY B
          </Text>

          <Text style={styles.infoValue}>
            {pact.counterpartyName ||
              pact.counterpartyEmail}
          </Text>

          <Text style={styles.infoLabel}>
            Designation
          </Text>

          <Text>
            {pact.counterpartyDesignation ||
              "Counterparty"}
          </Text>

          <Text
            style={[
              styles.infoLabel,
              { marginTop: 12 }
            ]}
          >
            Email
          </Text>

          <Text>
            {pact.counterpartyEmail}
          </Text>

        </View>

      </View>
    </>
  );
}