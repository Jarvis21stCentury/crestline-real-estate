"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { ToolSlider } from "./ToolSlider";
import { ResultRow } from "./ResultRow";
import { LoanTermSelector } from "./LoanTermSelector";
import { ToolAnimatedValue } from "./ToolAnimatedValue";
import { DTIProgressBar } from "./DTIProgressBar";

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
        <ToolSlider label="Annual Household Income" value={annualIncome} onChange={setAnnualIncome} min={30000} max={500000} step={5000} format="currency" />
        <ToolSlider label="Monthly Debt Payments" value={monthlyDebts} onChange={setMonthlyDebts} min={0} max={10000} step={50} format="currency" />
        <ToolSlider label="Available Down Payment" value={downPayment} onChange={setDownPayment} min={0} max={1000000} step={5000} format="currency" />
        <ToolSlider label="Expected Interest Rate" value={interestRate} onChange={setInterestRate} min={1} max={12} step={0.125} suffix="%" />
        <LoanTermSelector value={loanTerm} onChange={setLoanTerm} />
      </div>

      <div className="rounded-2xl border border-white/60 bg-white/70 p-8 shadow-[0_8px_32px_rgba(14,26,54,0.06),0_2px_8px_rgba(14,26,54,0.04)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(14,26,54,0.10),0_4px_12px_rgba(14,26,54,0.06)]">
        <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
          You Can Afford Up To
        </p>
        <div className="mt-2 font-bebas text-5xl text-oxford sm:text-6xl">
          <ToolAnimatedValue value={maxHomePrice} />
        </div>

        <div className="mt-8 space-y-1">
          <ResultRow label="Max Monthly Payment (28% rule)" value={formatCurrency(maxHousingPayment)} />
          <ResultRow label="Max From Debt Ratio (36% rule)" value={formatCurrency(maxHousingFromDebt)} />
          <ResultRow label="Binding Monthly Limit" value={formatCurrency(maxMonthly)} bold highlight />
          <div className="my-2 h-px bg-mercury/20" />
          <ResultRow label="Max Loan Amount" value={formatCurrency(maxLoan)} />
          <ResultRow label="Down Payment" value={formatCurrency(downPayment)} />
          <ResultRow label="Debt-to-Income Ratio" value={`${dtiRatio.toFixed(1)}%`} />
        </div>

        <DTIProgressBar value={dtiRatio} className="mt-8" />
      </div>
    </div>
  );
}
