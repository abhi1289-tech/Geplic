"use client";

type Props = {
  promiseText: string;
  setPromiseText: (value: string) => void;
};

export default function GeneralPromiseForm({
  promiseText,
  setPromiseText,
}: Props) {
  return (
    <section className="agreement-details">

      <header className="agreement-section-header">

        <h2 className="agreement-section-title">
          Agreement Details
        </h2>

      </header>

      <div className="form-group">

        <textarea
          required
          placeholder="Write the promise details"
          className="form-textarea form-textarea-xl"
          value={promiseText}
          onChange={(e) =>
            setPromiseText(e.target.value)
          }
        />

      </div>

    </section>
  );
}