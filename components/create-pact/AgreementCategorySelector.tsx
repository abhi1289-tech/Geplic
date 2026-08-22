"use client";

import { Listbox } from "@headlessui/react";

type Props = {
  category: string;
  setCategory: (value: string) => void;
};

const AGREEMENT_TYPES = [
  "Loan",
  "Freelance / Service",
  "General Promise",
  "Rent Agreement",
];

export default function AgreementCategorySelector({
  category,
  setCategory,
}: Props) {
  return (
    <section className="agreement-category">

      <label className="agreement-category-label">
        Agreement Type
      </label>

      <Listbox
        value={category}
        onChange={setCategory}
      >
        <div className="agreement-category-dropdown">

          <Listbox.Button className="agreement-category-button">

            <span className="agreement-category-value">
              {category}
            </span>

            <span className="agreement-category-arrow">
              ▼
            </span>

          </Listbox.Button>

          <Listbox.Options className="agreement-category-options">

            {AGREEMENT_TYPES.map((type) => (

              <Listbox.Option
                key={type}
                value={type}
                className={({ active }) =>
                  `agreement-category-option ${
                    active
                      ? "agreement-category-option-active"
                      : ""
                  }`
                }
              >

                {type}

              </Listbox.Option>

            ))}

          </Listbox.Options>

        </div>
      </Listbox>

    </section>
  );
}