import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingHorizontal: 36,
    paddingBottom: 42,
    backgroundColor: "#F8FAFC",
    color: "#111827",
    fontSize: 11,
    lineHeight: 1.6,
  },

  watermark: {
    position: "absolute",
    top: 240,
    left: 25,
    fontSize: 70,
    color: "#10B981",
    opacity: 0.05,
    transform: "rotate(-30deg)",
  },
  

  brand: {
    fontSize: 15,
    color: "#2563EB",
    fontWeight: "bold",
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 2,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginVertical: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 18,
  },

  card: {
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
  },

  infoLabel: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
  },

  partyContainer: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 16,
  },

  partyCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },

  lockedBanner: {
    borderWidth: 1,
    borderColor: "#FCD34D",
    backgroundColor: "#FEF3C7",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },

  lockedTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#92400E",
  },

  lockedText: {
    fontSize: 10,
    color: "#78350F",
    lineHeight: 1.5,
  },

  term: {
    marginBottom: 10,
    lineHeight: 1.7,
  },

  acceptanceContainer: {
    flexDirection: "row",
    gap: 14,
    marginTop: 6,
  },

  acceptanceCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },

  footer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#D1FAE5",
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#047857",
    marginBottom: 5,
  },

  hash: {
    width: 220,
    fontSize: 8,
    color: "#374151",
  },
  summaryCard: {
  borderWidth: 1,
  borderColor: "#D1FAE5",
  borderRadius: 12,
  backgroundColor: "#FFFFFF",
  padding: 18,
  marginBottom: 20,
},

summaryRow: {
  marginBottom: 8,
  fontSize: 11,
},

label: {
  fontWeight: "bold",
},

detailsCard: {
  borderWidth: 1,
  borderColor: "#D1FAE5",
  borderRadius: 12,
  backgroundColor: "#FFFFFF",
  padding: 18,
  marginTop: 18,
  marginBottom: 20,
},

termRow: {
  flexDirection: "row",
  marginBottom: 12,
},

termNumber: {
  width: 18,
  fontWeight: "bold",
},

termText: {
  flex: 1,
  lineHeight: 1.7,
},

ackCard: {
  borderWidth: 1,
  borderColor: "#D1FAE5",
  borderRadius: 12,
  backgroundColor: "#FFFFFF",
  padding: 18,
  marginTop: 18,
},

greenBox: {
  borderWidth: 1,
  borderColor: "#A7F3D0",
  backgroundColor: "#ECFDF5",
  borderRadius: 10,
  padding: 10,
  marginTop: 16,
},

acceptanceTitle: {
  fontSize: 8,
  color: "#6B7280",
  marginBottom: 14,
  letterSpacing: 2,
},

acceptanceName: {
  fontSize: 15,
  fontWeight: "bold",
},

acceptanceDesignation: {
  marginTop: 5,
  color: "#6B7280",
  fontSize: 10,
},

footerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 30,
  borderTopWidth: 1,
  borderTopColor: "#D1FAE5",
  paddingTop: 18,
},

footerColumn: {
  flex: 1,
},

footerRight: {
  flex: 1,
  textAlign: "right",
},

smallGrey: {
  fontSize: 9,
  color: "#6B7280",
},

hashText: {
  fontSize: 8,
  color: "#374151",
  marginTop: 4,
},

verifyLink: {
  fontSize: 8,
  color: "#374151",
  marginTop: 4,
},
});