"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { formatCurrency } from "@/lib/utils";
import { ToolSlider } from "./ToolSlider";
import { ResultRow } from "./ResultRow";
import { ToolAnimatedValue } from "./ToolAnimatedValue";
import { ComparisonBar } from "./ComparisonBar";

export function RentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(3500);
  const [homePrice, setHomePrice] = useState(750000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [appreciationRate, setAppreciationRate] = useState(3);
  const [rentIncreaseRate, setRentIncreaseRate] = useState(3);
  const [yearsToCompare, setYearsToCompare] = useState(10);

  const verdictRef = useRef<HTMLParagraphElement>(null);

  const downPayment = homePrice * (downPaymentPct / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = 30 * 12;

  let monthlyMortgage = 0;
  if (monthlyRate > 0) {
    monthlyMortgage =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  } else {
    monthlyMortgage = loanAmount / totalPayments;
  }

  const annualTax = homePrice * 0.011;
  const annualInsurance = 1800;
  const annualMaintenance = homePrice * 0.01;

  let totalRentCost = 0;
  let totalBuyCost = downPayment;
  let currentRent = monthlyRent;

  for (let year = 1; year <= yearsToCompare; year++) {
    totalRentCost += currentRent * 12;
    currentRent *= 1 + rentIncreaseRate / 100;
    totalBuyCost += monthlyMortgage * 12 + annualTax + annualInsurance + annualMaintenance;
  }

  const futureHomeValue = homePrice * Math.pow(1 + appreciationRate / 100, yearsToCompare);
  const equityBuilt = futureHomeValue - loanAmount * 0.85;
  const netBuyCost = totalBuyCost - equityBuilt;

  let breakEvenYear: number | null = null;
  let cumRent = 0;
  let cumBuy = downPayment;
  let rent = monthlyRent;
  for (let y = 1; y <= 30; y++) {
    cumRent += rent * 12;
    rent *= 1 + rentIncreaseRate / 100;
    cumBuy += monthlyMortgage * 12 + annualTax + annualInsurance + annualMaintenance;
    const equity = homePrice * Math.pow(1 + appreciationRate / 100, y) - loanAmount * Math.pow(0.97, y);
    const netBuy = cumBuy - equity;
    if (netBuy < cumRent && !breakEvenYear) {
      breakEvenYear = y;
    }
  }

  const buyingWins = netBuyCost < totalRentCost;

  useGSAP(
    () => {
      if (!verdictRef.current) return;
      gsap.fromTo(
        verdictRef.current,
        { y: 10, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }
      );
    },
    { dependencies: [buyingWins] }
  );

  const comparisonItems = [
    { label: "Total Renting", value: totalRentCost, color: "#C8CCD1", isWinner: !buyingWins },
    { label: "Net Buying", value: Math.max(0, netBuyCost), color: "#0E1A36", isWinner: buyingWins },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <ToolSlider label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} min={500} max={10000} step={100} format="currency" />
        <ToolSlider label="Home Purchase Price" value={homePrice} onChange={setHomePrice} min={100000} max={3000000} step={10000} format="currency" />
        <ToolSlider label="Down Payment" value={downPaymentPct} onChange={setDownPaymentPct} min={3} max={50} step={1} suffix="%" />
        <ToolSlider label="Mortgage Interest Rate" value={interestRate} onChange={setInterestRate} min={1} max={12} step={0.125} suffix="%" />
        <ToolSlider label="Home Appreciation Rate" value={appreciationRate} onChange={setAppreciationRate} min={0} max={8} step={0.5} suffix="%/yr" />
        <ToolSlider label="Annual Rent Increase" value={rentIncreaseRate} onChange={setRentIncreaseRate} min={0} max={8} step={0.5} suffix="%/yr" />
        <ToolSlider label="Comparison Period" value={yearsToCompare} onChange={setYearsToCompare} min={1} max={30} step={1} suffix=" years" />
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/60 bg-white/70 p-8 text-center shadow-[0_8px_32px_rgba(14,26,54,0.06),0_2px_8px_rgba(14,26,54,0.04)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(14,26,54,0.10),0_4px_12px_rgba(14,26,54,0.06)]">
          <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
            Over {yearsToCompare} Years
          </p>
          <p ref={verdictRef} className="mt-2 font-bebas text-4xl text-oxford">
            {buyingWins ? "Buying Wins" : "Renting Wins"}
          </p>
          {breakEvenYear && (
            <p className="mt-2 font-body text-sm text-oxford/60">
              Buying breaks even at year {breakEvenYear}
            </p>
          )}
        </div>

        <ComparisonBar items={comparisonItems} />

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_4px_16px_rgba(14,26,54,0.04)] backdrop-blur-md">
            <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
              Total Renting Cost
            </p>
            <div className="mt-2 font-bebas text-2xl text-oxford">
              <ToolAnimatedValue value={totalRentCost} />
            </div>
            <p className="mt-1 font-body text-xs text-oxford/50">No equity built</p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_4px_16px_rgba(14,26,54,0.04)] backdrop-blur-md">
            <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
              Net Buying Cost
            </p>
            <div className="mt-2 font-bebas text-2xl text-oxford">
              <ToolAnimatedValue value={netBuyCost} />
            </div>
            <p className="mt-1 font-body text-xs text-oxford/50">After equity &amp; appreciation</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_4px_16px_rgba(14,26,54,0.04)] backdrop-blur-md">
          <div className="space-y-1">
            <ResultRow label="Total Mortgage Payments" value={formatCurrency(monthlyMortgage * 12 * yearsToCompare)} />
            <ResultRow label="Taxes, Insurance, Maintenance" value={formatCurrency((annualTax + annualInsurance + annualMaintenance) * yearsToCompare)} />
            <ResultRow label="Down Payment" value={formatCurrency(downPayment)} />
            <div className="my-2 h-px bg-mercury/20" />
            <ResultRow label="Future Home Value" value={formatCurrency(futureHomeValue)} />
            <ResultRow label="Estimated Equity" value={formatCurrency(equityBuilt)} bold highlight />
          </div>
        </div>
      </div>
    </div>
  );
}
