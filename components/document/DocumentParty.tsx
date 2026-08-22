import DocumentField from "./DocumentField";

const EMPTY_VALUE = "Not Available";

type Props = {
  title: string;
  name: string;
  designation?: string;
  email?: string;
  className?: string;
};

export default function DocumentParty({
  title,
  name,
  designation,
  email,
  className = "",
}: Props) {
  return (
    <section
      className={`document-party ${className}`.trim()}
    >
      <h3 className="document-party-title">
        {title}
      </h3>

      <div className="document-party-content">
        <DocumentField
          label="Name"
          value={name}
        />

        <DocumentField
          label="Designation"
          value={
            designation || EMPTY_VALUE
          }
        />

        <DocumentField
          label="Email"
          value={email || EMPTY_VALUE}
        />
      </div>
    </section>
  );
}