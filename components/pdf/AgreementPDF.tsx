import { Document, Page } from "@react-pdf/renderer";
import { styles } from "./pdfStyles";

import PDFHeader from "./PDFHeader";
import PDFParties from "./PDFParties";
import PDFDocumentBody from "./PDFDocumentBody";

export default function AgreementPDF(props: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <PDFHeader pact={props.pact} />
    
        <PDFParties pact={props.pact} />

        <PDFDocumentBody pact={props.pact}
    templateFields={props.templateFields}
    terms={props.terms} />
      </Page>
    </Document>
  );
}