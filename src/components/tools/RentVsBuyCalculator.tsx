"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export function RentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(3500);
  const [homePrice, setHomePrice] = useState(750000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [appreciationRate, setAppreciationRate] = useState(3);
  const [rentIncreaseRate, setRentIncreaseRate] = useState(3);
  const [yearsToCompare, setYearsToCompare] = useState(10);

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

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <SliderInput label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} min={500} max={10000} step={100} format="currency" />
        <SliderInput label="Home Purchase Price" value={homePrice} onChange={setHomePrice} min={100000} max={3000000} step={10000} format="currency" />
        <SliderInput label="Down Payment" value={downPaymentPct} onChange={setDownPaymentPct} min={3} max={50} step={1} suffix="%" />
        <SliderInput label="Mortgage Interest Rate" value={interestRate} onChange={setInterestRate} min={1} max={12} step={0.125} suffix="%" />
        <SliderInput label="Home Appreciation Rate" value={appreciationRate} onChange={setAppreciationRate} min={0} max={8} step={0.5} suffix="%/yr" />
        <SliderInput label="Annual Rent Increase" value={rentIncreaseRate} onChange={setRentIncreaseRate} min={0} max={8} step={0.5} suffix="%/yr" />
        <SliderInput label="Comparison Period" value={yearsToCompare} onChange={setYearsToCompare} min={1} max={30} step={1} suffix=" years" />
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-mercury/30 bg-bone/50 p-8 text-center">
          <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
            Over {yearsToCompare} Years
          </p>
          <p className="mt-2 font-bebas text-4xl text-oxford">
            {buyingWins ? "Buying Wins" : "Renting Wins"}
          </p>
          {breakEvenYear && (
            <p className="mt-2 font-body text-sm text-oxford/60">
              Buying breaks even at year {breakEvenYear}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-mercury/30 bg-white p-6">
            <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
              Total Renting Cost
            </p>
            <p className="mt-2 font-bebas text-2xl text-oxford">
              {formatCurrency(totalRentCost)}
            </p>
            <p className="mt-1 font-body text-xs text-oxford/50">No equity built</p>
          </div>
          <div className="rounded-2xl border border-mercury/30 bg-white p-6">
            <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury">
              Net Buying Cost
            </p>
            <p className="mt-2 font-bebas text-2xl text-oxford">
              {formatCurrency(netBuyCost)}
            </p>
            <p className="mt-1 font-body text-xs text-oxford/50">After equity &amp; appreciation</p>
          </div>
        </div>

        <div className="rounded-2xl border border-mercury/30 bg-white p-6">
          <div className="space-y-3">
            <Row label="Total Mortgage Payments" value={formatCurrency(monthlyMortgage * 12 * yearsToCompare)} />
            <Row label="Taxes, Insurance, Maintenance" value={formatCurrency((annualTax + annualInsurance + annualMaintenance) * yearsToCompare)} />
            <Row label="Down Payment" value={formatCurrency(downPayment)} />
            <div className="border-t border-mercury/30 pt-3">
              <Row label="Future Home Value" value={formatCurrency(futureHomeValue)} />
              <Row label="Estimated Equity" value={formatCurrency(equityBuilt)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-body text-sm text-oxford/60">{label}</span>
      <span className="font-bebas text-sm text-oxford">{value}</span>
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
