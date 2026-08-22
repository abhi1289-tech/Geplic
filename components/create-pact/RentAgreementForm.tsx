"use client";

type Props = {
  propertyAddress: string;
  setPropertyAddress: (value: string) => void;

  monthlyRent: string;
  setMonthlyRent: (value: string) => void;

  securityDeposit: string;
  setSecurityDeposit: (value: string) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  durationMonths: string;
  setDurationMonths: (value: string) => void;
};

export default function RentAgreementForm({
  propertyAddress,
  setPropertyAddress,
  monthlyRent,
  setMonthlyRent,
  securityDeposit,
  setSecurityDeposit,
  startDate,
  setStartDate,
  durationMonths,
  setDurationMonths,
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
            Property Address
          </label>

          <textarea
            required
            placeholder="Property Address"
            className="form-textarea form-textarea-md"
            value={propertyAddress}
            onChange={(e) =>
              setPropertyAddress(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Monthly Rent
          </label>

          <input
            required
            type="number"
            placeholder="Monthly Rent"
            className="form-input"
            value={monthlyRent}
            onChange={(e) =>
              setMonthlyRent(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Security Deposit
          </label>

          <input
            required
            type="number"
            placeholder="Security Deposit"
            className="form-input"
            value={securityDeposit}
            onChange={(e) =>
              setSecurityDeposit(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Start Date
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
            value={startDate}
            onFocus={(e) =>
              e.target.showPicker?.()
            }
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Duration (Months)
          </label>

          <input
            required
            type="number"
            placeholder="Duration (Months)"
            className="form-input"
            value={durationMonths}
            onChange={(e) =>
              setDurationMonths(
                e.target.value
              )
            }
          />

        </div>

      </div>

    </section>
  );
}