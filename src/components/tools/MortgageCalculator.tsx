"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(750000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1);
  const [insuranceAnnual, setInsuranceAnnual] = useState(1800);

  const downPayment = homePrice * (downPaymentPct / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  let monthlyPI = 0;
  if (monthlyRate > 0) {
    monthlyPI =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  } else {
    monthlyPI = loanAmount / totalPayments;
  }

  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = insuranceAnnual / 12;
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;
  const totalCost = totalMonthly * totalPayments;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <InputSlider label="Home Price" value={homePrice} onChange={setHomePrice} min={50000} max={5000000} step={10000} format="currency" />
        <InputSlider label="Down Payment" value={downPaymentPct} onChange={setDownPaymentPct} min={0} max={50} step={1} suffix="%" />
        <InputSlider label="Interest Rate" value={interestRate} onChange={setInterestRate} min={1} max={12} step={0.125} suffix="%" />
        <div>
          <label className="mb-1.5 block font-body text-sm font-bold text-oxford">Loan Term</label>
          <div className="flex gap-3">
            {[15, 20, 30].map((term) => (
              <button
                key={term}
                onClick={() => setLoanTerm(term)}
                className={`flex-1 rounded-lg border py-2.5 font-bebas text-sm uppercase tracking-[0.1em] transition-colors duration-300 ${
                  loanTerm === term
                    ? "border-oxford bg-oxford text-white"
                    : "border-mercury/40 text-oxford/60 hover:border-oxford/30"
                }`}
              >
                {term} yr
              </button>
            ))}
          </div>
        </div>
        <InputSlider label="Property Tax Rate" value={propertyTaxRate} onChange={setPropertyTaxRate} min={0} max={3} step={0.05} suffix="%" />
        <InputSlider label="Annual Insurance" value={insuranceAnnual} onChange={setInsuranceAnnual} min={0} max={10000} step={100} format="currency" />
      </div>

      <div className="rounded-2xl border border-mercury/30 bg-bone/50 p-8">
        <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
          Estimated Monthly Payment
        </p>
        <p className="mt-2 font-bebas text-5xl text-oxford sm:text-6xl">
          {formatCurrency(totalMonthly)}
        </p>

        <div className="mt-8 space-y-4">
          <ResultRow label="Principal & Interest" value={monthlyPI} />
          <ResultRow label="Property Tax" value={monthlyTax} />
          <ResultRow label="Home Insurance" value={monthlyInsurance} />
          <div className="border-t border-mercury/30 pt-4">
            <ResultRow label="Down Payment" value={downPayment} />
            <ResultRow label="Loan Amount" value={loanAmount} />
          </div>
          <div className="border-t border-mercury/30 pt-4">
            <ResultRow label="Total Cost Over Loan Life" value={totalCost} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-body text-sm text-oxford/60">{label}</span>
      <span className="font-bebas text-sm text-oxford">{formatCurrency(value)}</span>
    </div>
  );
}

function InputSlider({
  label, value, onChange, min, max, step, suffix, format,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; suffix?: string; format?: "currency";
}) {
  const display = format === "currency" ? formatCurrency(value) : `${value}${suffix || ""}`;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="font-body text-sm font-bold text-oxford">{label}</label>
        <span className="font-bebas text-sm text-oxford">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-oxford"
      />
    </div>
  );
}
