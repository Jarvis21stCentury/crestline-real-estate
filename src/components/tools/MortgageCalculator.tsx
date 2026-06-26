"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { ToolSlider } from "./ToolSlider";
import { ResultRow } from "./ResultRow";
import { LoanTermSelector } from "./LoanTermSelector";
import { ToolAnimatedValue } from "./ToolAnimatedValue";
import { DonutChart } from "./DonutChart";

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

  const donutSegments = [
    { label: "Principal & Interest", value: monthlyPI, color: "#0E1A36" },
    { label: "Property Tax", value: monthlyTax, color: "#C8CCD1" },
    { label: "Insurance", value: monthlyInsurance, color: "#E5E4E2" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <ToolSlider label="Home Price" value={homePrice} onChange={setHomePrice} min={50000} max={5000000} step={10000} format="currency" />
        <ToolSlider label="Down Payment" value={downPaymentPct} onChange={setDownPaymentPct} min={0} max={50} step={1} suffix="%" />
        <ToolSlider label="Interest Rate" value={interestRate} onChange={setInterestRate} min={1} max={12} step={0.125} suffix="%" />
        <LoanTermSelector value={loanTerm} onChange={setLoanTerm} />
        <ToolSlider label="Property Tax Rate" value={propertyTaxRate} onChange={setPropertyTaxRate} min={0} max={3} step={0.05} suffix="%" />
        <ToolSlider label="Annual Insurance" value={insuranceAnnual} onChange={setInsuranceAnnual} min={0} max={10000} step={100} format="currency" />
      </div>

      <div className="rounded-2xl border border-white/60 bg-white/70 p-8 shadow-[0_8px_32px_rgba(14,26,54,0.06),0_2px_8px_rgba(14,26,54,0.04)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(14,26,54,0.10),0_4px_12px_rgba(14,26,54,0.06)]">
        <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
          Estimated Monthly Payment
        </p>
        <div className="mt-2 font-bebas text-5xl text-oxford sm:text-6xl">
          <ToolAnimatedValue value={totalMonthly} />
        </div>

        <DonutChart
          segments={donutSegments}
          centerLabel="Monthly"
          centerValue={formatCurrency(totalMonthly)}
          className="mt-8"
        />

        <div className="mt-8 space-y-1">
          <ResultRow label="Principal & Interest" value={monthlyPI} />
          <ResultRow label="Property Tax" value={monthlyTax} />
          <ResultRow label="Home Insurance" value={monthlyInsurance} />
          <div className="my-2 h-px bg-mercury/20" />
          <ResultRow label="Down Payment" value={downPayment} />
          <ResultRow label="Loan Amount" value={loanAmount} />
          <div className="my-2 h-px bg-mercury/20" />
          <ResultRow label="Total Cost Over Loan Life" value={totalCost} bold />
        </div>
      </div>
    </div>
  );
}
