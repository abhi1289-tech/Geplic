import { Text, View } from "@react-pdf/renderer";
import { styles } from "./pdfStyles";

type Props = {
  pact: any;
};

function getWatermark(status: string) {
  switch (status) {
    case "completed":
      return "GEPLIC VERIFIED";
    case "pending":
      return "PENDING";
    case "draft":
      return "DRAFT";
    case "voided":
      return "VOID";
    default:
      return "GEPLIC";
  }
}

export default function PDFHeader({
  pact,
}: Props) {
  const watermark = getWatermark(pact.status);

  return (
    <>
      {/* Watermarks */}

      <Text fixed style={styles.watermark}>
        {watermark}
      </Text>

      <Text
        fixed
        style={{
          ...styles.watermark,
          top: 520,
        }}
      >
        {watermark}
      </Text>

      {/* Brand */}

      <Text style={styles.brand}>
        Geplic
      </Text>

      {/* Title */}

      <Text style={styles.title}>
        DIGITAL AGREEMENT
      </Text>

      {/* Metadata Card */}

      <View style={styles.card}>
        <Text style={styles.infoLabel}>
          Agreement Type
        </Text>

        <Text style={styles.infoValue}>
          {pact.contractType}
        </Text>

        <Text style={styles.infoLabel}>
          Agreement ID
        </Text>

        <Text style={styles.infoValue}>
  {pact.agreementId || pact.id || "Not Available"}
</Text>

        <Text style={styles.infoLabel}>
          Status
        </Text>

        <Text style={styles.infoValue}>
          {pact.status?.toUpperCase()}
        </Text>

        <Text style={styles.infoLabel}>
          Generated On
        </Text>

        <Text>
          {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.divider} />
    </>
  );
}