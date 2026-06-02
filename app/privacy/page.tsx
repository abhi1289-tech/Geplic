export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-white">
      <h1 className="text-4xl font-bold">
        Privacy Policy
      </h1>

      <p className="mt-6">
        Geplic collects only the information necessary
        to create and manage digital agreements.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">
        Information We Collect
      </h2>

      <ul className="mt-4 list-disc pl-6">
        <li>Name</li>
        <li>Email Address</li>
        <li>Agreement Data</li>
        <li>Audit Trail Records</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">
        How We Use Information
      </h2>

      <ul className="mt-4 list-disc pl-6">
        <li>Create agreements</li>
        <li>Verify participants</li>
        <li>Maintain audit logs</li>
        <li>Improve platform security</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">
        Data Security
      </h2>

      <p className="mt-4">
        Geplic uses industry-standard security
        measures to protect user information.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">
        Contact
      </h2>

      <p className="mt-4">
        For privacy-related questions, contact us
        through Geplic support.
      </p>
    </main>
  );
}