"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { MortgageCalculator } from "@/components/tools/MortgageCalculator";
import { AffordabilityCalculator } from "@/components/tools/AffordabilityCalculator";
import { RentVsBuyCalculator } from "@/components/tools/RentVsBuyCalculator";

const TABS = [
  { id: "mortgage", label: "Mortgage Calculator" },
  { id: "affordability", label: "Affordability" },
  { id: "rent-vs-buy", label: "Rent vs. Buy" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("mortgage");

  return (
    <>
      <section className="bg-oxford pb-28 pt-44 sm:pb-36 sm:pt-52">
        <Container>
          <p className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
            Financial Tools
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight text-platinum sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="font-cormorant">Make </span>
            <span className="font-bebas">INFORMED</span>
            <span className="font-cormorant italic"> Decisions</span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-mercury">
            Use our interactive calculators to explore financing scenarios,
            determine affordability, and compare the economics of renting
            versus buying.
          </p>
        </Container>
      </section>

      <section className="bg-bone py-24 sm:py-32">
        <Container>
          <div className="mb-10 flex flex-wrap gap-2 border-b border-mercury/30 pb-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 font-bebas text-sm uppercase tracking-[0.1em] transition-colors duration-300",
                  activeTab === tab.id
                    ? "bg-oxford text-white"
                    : "text-oxford/60 hover:bg-oxford/5 hover:text-oxford"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "mortgage" && <MortgageCalculator />}
          {activeTab === "affordability" && <AffordabilityCalculator />}
          {activeTab === "rent-vs-buy" && <RentVsBuyCalculator />}
        </Container>
      </section>
    </>
  );
}
