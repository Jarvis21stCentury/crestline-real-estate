"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(150000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const monthlyIncome = annualIncome / 12;
  const maxHousingPayment = monthlyIncome * 0.28;
  const maxTotalDebt = monthlyIncome * 0.36;
  const maxHousingFromDebt = maxTotalDebt - monthlyDebts;
  const maxMonthly = Math.max(0, Math.min(maxHousingPayment, maxHousingFromDebt));

  const monthlyRate = interestRate / 100 / 12;
  const n = loanTerm * 12;

  let maxLoan = 0;
  if (monthlyRate > 0) {
    maxLoan =
      (maxMonthly * (Math.pow(1 + monthlyRate, n) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, n));
  } else {
    maxLoan = maxMonthly * n;
  }

  const maxHomePrice = maxLoan + downPayment;
  const dtiRatio = ((maxMonthly + monthlyDebts) / monthlyIncome) * 100;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <SliderInput label="Annual Household Income" value={annualIncome} onChange={setAnnualIncome} min={30000} max={500000} step={5000} format="currency" />
        <SliderInput label="Monthly Debt Payments" value={monthlyDebts} onChange={setMonthlyDebts} min={0} max={10000} step={50} format="currency" />
        <SliderInput label="Available Down Payment" value={downPayment} onChange={setDownPayment} min={0} max={1000000} step={5000} format="currency" />
        <SliderInput label="Expected Interest Rate" value={interestRate} onChange={setInterestRate} min={1} max={12} step={0.125} suffix="%" />
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
      </div>

      <div className="rounded-2xl border border-mercury/30 bg-bone/50 p-8">
        <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
          You Can Afford Up To
        </p>
        <p className="mt-2 font-bebas text-5xl text-oxford sm:text-6xl">
          {formatCurrency(maxHomePrice)}
        </p>

        <div className="mt-8 space-y-4">
          <Row label="Max Monthly Payment (28% rule)" value={formatCurrency(maxHousingPayment)} />
          <Row label="Max From Debt Ratio (36% rule)" value={formatCurrency(maxHousingFromDebt)} />
          <Row label="Binding Monthly Limit" value={formatCurrency(maxMonthly)} bold />
          <div className="border-t border-mercury/30 pt-4">
            <Row label="Max Loan Amount" value={formatCurrency(maxLoan)} />
            <Row label="Down Payment" value={formatCurrency(downPayment)} />
            <Row label="Debt-to-Income Ratio" value={`${dtiRatio.toFixed(1)}%`} />
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex justify-between font-body text-xs text-oxford/50">
            <span>DTI: {dtiRatio.toFixed(1)}%</span>
            <span>36% max</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-mercury/30">
            <div
              className="h-full rounded-full bg-oxford transition-all duration-300"
              style={{ width: `${Math.min(100, (dtiRatio / 36) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-body text-sm text-oxford/60">{label}</span>
      <span className={`font-bebas text-sm text-oxford ${bold ? "text-base" : ""}`}>{value}</span>
    </div>
  );
}

function SliderInput({
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
