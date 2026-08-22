"use client";

type Props = {
  serviceDescription: string;
  setServiceDescription: (value: string) => void;

  paymentAmount: string;
  setPaymentAmount: (value: string) => void;

  deliveryDate: string;
  setDeliveryDate: (value: string) => void;
};

export default function FreelanceAgreementForm({
  serviceDescription,
  setServiceDescription,
  paymentAmount,
  setPaymentAmount,
  deliveryDate,
  setDeliveryDate,
}: Props) {
  return (
    <section className="agreement-details">

      <header className="agreement-section-header">

        <h2 className="agreement-section-title">
          Agreement Details
        </h2>

      </header>

      <div className="agreement-details-grid">

        <div className="form-group agreement-details-full">

          <label className="form-label">
            Service Description
          </label>

          <textarea
            required
            placeholder="Describe the service agreement"
            className="form-textarea form-textarea-lg"
            value={serviceDescription}
            onChange={(e) =>
              setServiceDescription(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Payment Amount
          </label>

          <input
            required
            type="number"
            placeholder="Payment Amount"
            className="form-input"
            value={paymentAmount}
            onChange={(e) =>
              setPaymentAmount(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Delivery Date
          </label>

          <input
            required
            type="date"
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            max="2099-12-31"
            className="form-input"
            value={deliveryDate}
            onFocus={(e) =>
              e.target.showPicker?.()
            }
            onChange={(e) =>
              setDeliveryDate(
                e.target.value
              )
            }
          />

        </div>

      </div>

    </section>
  );
}