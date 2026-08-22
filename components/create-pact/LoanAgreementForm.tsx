"use client";

type Props = {
  loanAmount: string;
  setLoanAmount: (value: string) => void;

  interestRate: string;
  setInterestRate: (value: string) => void;

  repaymentDate: string;
  setRepaymentDate: (value: string) => void;
};

export default function LoanAgreementForm({
  loanAmount,
  setLoanAmount,
  interestRate,
  setInterestRate,
  repaymentDate,
  setRepaymentDate,
}: Props) {
  return (
    <section className="agreement-details">

      <header className="agreement-section-header">

        <h2 className="agreement-section-title">
          Agreement Details
        </h2>

      </header>

      <div className="agreement-details-grid">

        <div className="form-group">

          <label className="form-label">
            Loan Amount
          </label>

          <input
            required
            type="number"
            placeholder="Loan Amount"
            className="form-input"
            value={loanAmount}
            onChange={(e) =>
              setLoanAmount(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Interest Rate (%)
          </label>

          <input
            required
            type="number"
            placeholder="Interest Rate (%)"
            className="form-input"
            value={interestRate}
            onChange={(e) =>
              setInterestRate(e.target.value)
            }
          />

        </div>

        <div className="form-group agreement-details-full">

          <label className="form-label">
            Repayment Date
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
            value={repaymentDate}
            onFocus={(e) =>
              e.target.showPicker?.()
            }
            onChange={(e) =>
              setRepaymentDate(
                e.target.value
              )
            }
            className="form-input"
          />

        </div>

      </div>

    </section>
  );
}