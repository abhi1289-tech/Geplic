type Props = {
  message?: string;
};

export default function VerificationNotFound({
  message = "No agreement was found using this Agreement ID or Document Hash.",
}: Props) {
  return (
    <section className="verification-not-found">

      <h2 className="verification-not-found-title">
        Verification Failed
      </h2>

      <p className="verification-not-found-message">
        {message}
      </p>

    </section>
  );
}