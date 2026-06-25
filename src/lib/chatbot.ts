export interface ChatOption {
  label: string;
  value: string;
}

export interface ChatResponse {
  text: string;
  options: ChatOption[];
}

const DEFAULT_OPTIONS: ChatOption[] = [
  { label: "Your Services", value: "services" },
  { label: "Meet the Team", value: "team" },
  { label: "Market Insights", value: "market" },
  { label: "Getting Started", value: "getting-started" },
];

const KNOWLEDGE_BASE: Record<string, ChatResponse> = {
  services: {
    text: `Crestline & Associates offers a full spectrum of real estate advisory services:\n\n• **Acquisitions & Dispositions** — Strategic sourcing, underwriting, and execution for commercial and residential properties. We specialize in identifying off-market opportunities.\n\n• **Commercial Leasing** — Tenant and landlord representation for office, retail, and industrial spaces, including lease negotiation and portfolio optimization.\n\n• **Investment Advisory** — Data-driven portfolio construction, risk assessment, and performance benchmarking for institutional and private investors.\n\n• **Property Management** — Comprehensive asset management including tenant relations, capital planning, and operational efficiency.\n\n• **Market Research & Valuation** — Comparable sales analysis, rent studies, and development feasibility reports.\n\n• **Residential Services** — Premium advisory for luxury home buyers and sellers across the Peninsula and Bay Area.`,
    options: [
      { label: "Commercial Services", value: "commercial" },
      { label: "Residential Services", value: "residential" },
      { label: "Investment Advisory", value: "investment" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  commercial: {
    text: `Our commercial practice serves Fortune 500 corporations, emerging enterprises, and institutional investors across the Bay Area.\n\n**What we handle:**\n• Office, retail, and industrial acquisitions\n• Tenant & landlord representation\n• 1031 exchange consulting\n• Build-to-suit coordination\n• Portfolio optimization\n\nOur Director of Commercial Services, Elena Vasquez, brings 15 years of institutional experience and previously led West Coast acquisitions for a national REIT. She holds an MS in Real Estate from MIT and is SIOR and LEED AP certified.\n\nEvery engagement begins with a thorough market analysis and a strategy tailored to your specific objectives.`,
    options: [
      { label: "Leasing Process", value: "leasing" },
      { label: "Investment Advisory", value: "investment" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  residential: {
    text: `Our residential division provides white-glove advisory for discerning buyers and sellers across the Greater Bay Area and Peninsula.\n\n**What we offer:**\n• Luxury home buying & selling\n• Multi-family investment properties\n• Relocation services\n• Market timing & pricing strategy\n\nDavid Park, our Director of Residential Services, has facilitated 300+ transactions totaling over $800M in sales volume. He's recognized as a Top 1% Bay Area agent and holds the Certified Luxury Home Specialist designation.\n\nWhether it's your first home or a luxury estate, we bring the same analytical rigor and personalized attention to every transaction.`,
    options: [
      { label: "Buying Process", value: "buying" },
      { label: "Selling Process", value: "selling" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  team: {
    text: `Our leadership team combines decades of institutional real estate experience:\n\n**Marcus Crestline** — Principal & Founder\n20+ years in Bay Area commercial real estate. MBA from Stanford GSB. CCIM designated. Has overseen $2B+ in transaction activity. Founded the firm to prioritize client outcomes over transaction volume.\n\n**Elena Vasquez** — Director of Commercial Services\n15 years of institutional experience. MS Real Estate from MIT. SIOR Member and LEED AP Certified. Previously led West Coast acquisitions for a national REIT.\n\n**David Park** — Director of Residential Services\n10+ years specializing in Peninsula luxury real estate. Top 1% Bay Area agent. 300+ transactions, $800M+ in sales volume. Certified Luxury Home Specialist.`,
    options: [
      { label: "Our Values", value: "values" },
      { label: "Credentials", value: "credentials" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  values: {
    text: `Four principles guide every decision we make:\n\n**Integrity First** — We structure every engagement to align our success with yours. No conflicts of interest, no hidden incentives — just transparent, honest advisory.\n\n**Analytical Rigor** — Every recommendation is backed by data. We combine deep market knowledge with quantitative analysis to ensure informed decisions.\n\n**Client Partnership** — We don't see transactions — we see relationships. Our 97% retention rate reflects a commitment to long-term partnership.\n\n**Market Mastery** — 25+ years of Bay Area expertise means we know every submarket, every cycle, and every nuance. That depth gives our clients a meaningful edge.`,
    options: [
      { label: "Meet the Team", value: "team" },
      { label: "Our Services", value: "services" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  credentials: {
    text: `Our team holds the industry's most respected designations and maintains active memberships:\n\n**Designations:**\n• CCIM (Certified Commercial Investment Member)\n• SIOR (Society of Industrial & Office Realtors)\n• LEED AP (Leadership in Energy & Environmental Design)\n• Certified Luxury Home Specialist\n\n**Affiliations:**\n• National Association of Realtors\n• Urban Land Institute\n• California DRE Licensed Brokers\n\n**By the Numbers:**\n• $3.2B+ in transaction volume managed\n• 200+ active client relationships\n• 25+ years combined experience\n• 97% client retention rate`,
    options: [
      { label: "Meet the Team", value: "team" },
      { label: "Our Services", value: "services" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  market: {
    text: `Here's a snapshot of the Greater Bay Area & Peninsula real estate market:\n\n**Commercial Trends:**\n• Office vacancy rates have been stabilizing, with Class A properties in core submarkets seeing renewed leasing activity\n• Industrial and logistics assets continue to see strong demand driven by e-commerce growth\n• Mixed-use developments are gaining traction as cities encourage live-work-play environments\n\n**Residential Trends:**\n• Peninsula communities remain among the most competitive in the country\n• Limited housing supply continues to support strong pricing, particularly in top school districts\n• Multi-family investment properties are showing attractive cap rates relative to other coastal markets\n\nOur team publishes quarterly market reports with detailed submarket analysis. Reach out for a complimentary copy.`,
    options: [
      { label: "Commercial Outlook", value: "commercial-outlook" },
      { label: "Residential Outlook", value: "residential-outlook" },
      { label: "Investment Opportunities", value: "investment" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  "commercial-outlook": {
    text: `**Bay Area Commercial Market Outlook:**\n\n**Office:** The flight-to-quality trend continues. Premium, amenity-rich office spaces in transit-oriented locations are outperforming. Tenants are prioritizing flexibility, sustainability, and employee experience. We're seeing shorter lease terms with expansion options gaining popularity.\n\n**Industrial:** Bay Area industrial remains supply-constrained. Last-mile logistics facilities near population centers command premium rents. Development pipeline is limited due to zoning and land availability.\n\n**Retail:** Neighborhood retail anchored by grocery, fitness, and services is resilient. High-street retail in premium locations like Palo Alto and downtown San Francisco continues to attract national and luxury tenants.\n\n**Multifamily:** Strong rental demand across all Bay Area submarkets. New construction is moderating, which should support occupancy and rent growth going forward.\n\nWant specifics on a particular submarket? Schedule a consultation with our commercial team.`,
    options: [
      { label: "Residential Outlook", value: "residential-outlook" },
      { label: "Investment Advisory", value: "investment" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  "residential-outlook": {
    text: `**Bay Area & Peninsula Residential Market Outlook:**\n\n**Pricing:** Home prices across the Peninsula remain strong, supported by limited inventory and sustained demand from the technology sector. Median prices in cities like Palo Alto, Menlo Park, and Los Altos continue to rank among the highest nationally.\n\n**Inventory:** The Bay Area remains a supply-constrained market. Well-priced, move-in-ready homes in top school districts frequently receive multiple offers within the first week.\n\n**Buyer Trends:** We're seeing strong demand from both local move-up buyers and relocating professionals. Many buyers are prioritizing outdoor space, home offices, and proximity to commuter routes.\n\n**Seller Positioning:** Strategic pricing and presentation remain critical. Homes that are properly staged and marketed through targeted channels consistently achieve premium outcomes.\n\nOur residential team provides detailed comparative market analyses for any Peninsula community.`,
    options: [
      { label: "Buying Process", value: "buying" },
      { label: "Selling Process", value: "selling" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  "getting-started": {
    text: `Great question! Here's how working with Crestline & Associates typically begins:\n\n**1. Discovery Session** — We start with a conversation to understand your goals, timeline, risk tolerance, and constraints. This is complimentary and comes with no obligation.\n\n**2. Strategy Development** — Based on the discovery session, we develop a tailored strategy — whether that's a property search, valuation analysis, portfolio review, or go-to-market plan.\n\n**3. Execution** — We execute the strategy with full transparency. You'll receive regular updates, market insights, and our candid assessment at every decision point.\n\n**4. Ongoing Support** — Our relationship doesn't end at closing. We provide ongoing advisory, market updates, and asset management guidance.\n\nThe best way to start is to schedule a consultation with our team. What are you most interested in?`,
    options: [
      { label: "Commercial Services", value: "commercial" },
      { label: "Residential Services", value: "residential" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  investment: {
    text: `Our Investment Advisory practice serves institutional and private clients seeking data-driven real estate strategies.\n\n**What we provide:**\n• Portfolio construction and allocation recommendations\n• Risk assessment and sensitivity analysis\n• Performance benchmarking against industry indices\n• 1031 exchange strategy and identification\n• Due diligence and underwriting support\n\n**Asset classes we cover:**\n• Multi-family residential\n• Office and flex-space\n• Industrial and logistics\n• Retail (neighborhood and high-street)\n• Mixed-use developments\n\nEvery investment recommendation is backed by rigorous quantitative analysis — including cash flow modeling, cap rate analysis, and scenario planning. We present clear, data-supported opinions so you can make informed decisions.\n\nInterested in exploring investment opportunities? Let's talk.`,
    options: [
      { label: "Market Insights", value: "market" },
      { label: "Our Credentials", value: "credentials" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  leasing: {
    text: `**Commercial Leasing Services:**\n\nWhether you're a tenant seeking the right space or a landlord looking to maximize occupancy, our leasing team delivers results.\n\n**For Tenants:**\n• Space needs analysis and site selection\n• Market rent benchmarking\n• Lease negotiation and review\n• Renewal and expansion strategy\n• Build-out coordination\n\n**For Landlords:**\n• Property marketing and positioning\n• Tenant prospecting and qualification\n• Lease structure optimization\n• Market competitive analysis\n• Portfolio lease management\n\nWe handle office, retail, and industrial leasing across the Bay Area. Our approach is consultative — we focus on understanding your business needs first, then finding the right real estate solution.`,
    options: [
      { label: "Commercial Services", value: "commercial" },
      { label: "Market Insights", value: "market" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  buying: {
    text: `**The Home Buying Process with Crestline:**\n\n**Step 1: Consultation & Pre-Approval**\nWe discuss your priorities — location, size, style, budget — and connect you with preferred lending partners for mortgage pre-approval.\n\n**Step 2: Property Search**\nWe curate a targeted selection of homes matching your criteria, including off-market opportunities through our network. You'll receive detailed analysis on each property.\n\n**Step 3: Property Tours & Evaluation**\nWe tour properties together and provide our candid assessment of value, condition, and neighborhood dynamics.\n\n**Step 4: Offer & Negotiation**\nWe craft a competitive offer strategy based on comparable sales data and market conditions. Our negotiation approach is analytical and assertive.\n\n**Step 5: Due Diligence & Closing**\nWe coordinate inspections, appraisals, and all closing logistics. Our team manages the process end-to-end so you can focus on the excitement of your new home.\n\nReady to start your home search?`,
    options: [
      { label: "Residential Services", value: "residential" },
      { label: "Financial Tools", value: "tools" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  selling: {
    text: `**The Home Selling Process with Crestline:**\n\n**Step 1: Valuation & Strategy**\nWe provide a detailed comparative market analysis and recommend a pricing strategy based on current market conditions, comparable sales, and your timeline.\n\n**Step 2: Preparation & Staging**\nWe advise on improvements that maximize return, coordinate professional staging, and arrange photography and virtual tours.\n\n**Step 3: Marketing & Exposure**\nYour property receives comprehensive marketing — professional media, targeted digital campaigns, broker networking, and strategic open houses.\n\n**Step 4: Offer Management**\nWe present all offers with clear analysis, negotiate on your behalf, and help you evaluate the strongest terms — not just the highest price.\n\n**Step 5: Closing & Transition**\nWe manage inspections, appraisals, and closing logistics. Our team ensures a smooth transition from listing to close.\n\nThinking about selling? We'd be happy to provide a complimentary home valuation.`,
    options: [
      { label: "Residential Services", value: "residential" },
      { label: "Market Insights", value: "residential-outlook" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  fees: {
    text: `**How Our Fees Work:**\n\nWe believe in full fee transparency before any engagement begins.\n\n**Commercial Advisory:**\n• Typically structured as a flat fee or success-based fee aligned with transaction milestones\n• Scope and pricing are defined upfront in a written engagement agreement\n• No hidden costs or surprise charges\n\n**Residential Services:**\n• Competitive commission model consistent with Bay Area market standards\n• Seller and buyer representation fees discussed at the initial consultation\n\n**Advisory & Consulting:**\n• Hourly or project-based fees for standalone services like market research, valuations, or portfolio reviews\n\nWe're happy to discuss fee structures in detail during a consultation. Our goal is to ensure you understand exactly what you're paying for and the value you'll receive.`,
    options: [
      { label: "Getting Started", value: "getting-started" },
      { label: "Our Services", value: "services" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  tools: {
    text: `We offer several free financial tools on our website to help you make informed decisions:\n\n**Mortgage Calculator** — Estimate your monthly payment based on home price, down payment, interest rate, and loan term. Includes property tax and insurance.\n\n**Affordability Calculator** — Determine how much home you can afford based on your income, debts, and down payment using the 28/36 qualifying rule.\n\n**Rent vs. Buy Calculator** — Compare the long-term financial impact of renting versus buying, factoring in appreciation, rent increases, and equity buildup.\n\nYou can access all of these tools on our Tools page. They update in real-time as you adjust the inputs — no sign-up required.\n\nWant help interpreting the results? Our team is always available for a deeper conversation.`,
    options: [
      { label: "Buying Process", value: "buying" },
      { label: "Getting Started", value: "getting-started" },
      { label: "Schedule a Consultation", value: "contact" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  contact: {
    text: `We'd love to hear from you! Here's how to reach us:\n\n**Office:**\nOne Embarcadero Center, Suite 2400\nSan Francisco, CA 94111\n\n**Phone:** (415) 555-0192\n**Email:** hello@crestlineassociates.com\n\n**Hours:**\nMonday – Friday: 8:00 AM – 6:00 PM\nSaturday: By appointment\n\nYou can also fill out the contact form on our Contact page, and we'll respond within one business day.\n\nWhether you have a specific transaction in mind or just want to explore your options — we're here to help.`,
    options: [
      { label: "Our Services", value: "services" },
      { label: "Meet the Team", value: "team" },
      { label: "Getting Started", value: "getting-started" },
      { label: "Back to Main Menu", value: "menu" },
    ],
  },
  menu: {
    text: `What would you like to know about? Choose a topic below, or type your question.`,
    options: DEFAULT_OPTIONS,
  },
};

const KEYWORD_MAP: [string[], string][] = [
  [["service", "offer", "what do you do", "help with"], "services"],
  [["commercial", "office", "retail", "industrial"], "commercial"],
  [["residential", "home", "house", "condo"], "residential"],
  [["team", "agent", "who", "people", "staff", "advisor"], "team"],
  [["value", "principle", "believe", "mission", "culture"], "values"],
  [["credential", "certification", "license", "designation", "qualified"], "credentials"],
  [["market", "trend", "outlook", "forecast"], "market"],
  [["invest", "portfolio", "roi", "cap rate", "return"], "investment"],
  [["lease", "leasing", "rent an office", "tenant", "landlord"], "leasing"],
  [["buy", "buying", "purchase", "first home", "how to buy"], "buying"],
  [["sell", "selling", "list my home", "how to sell"], "selling"],
  [["fee", "cost", "price", "commission", "charge", "how much"], "fees"],
  [["start", "begin", "process", "how does it work", "next step"], "getting-started"],
  [["calculator", "tool", "mortgage", "afford", "rent vs"], "tools"],
  [["contact", "reach", "phone", "email", "address", "schedule", "consult"], "contact"],
];

export function getResponse(input: string): ChatResponse {
  const key = input.toLowerCase().trim();

  if (KNOWLEDGE_BASE[key]) {
    return KNOWLEDGE_BASE[key];
  }

  for (const [keywords, topicKey] of KEYWORD_MAP) {
    if (keywords.some((kw) => key.includes(kw))) {
      return KNOWLEDGE_BASE[topicKey];
    }
  }

  return {
    text: `Thanks for your question! I can help you with information about our services, team, market insights, the buying or selling process, fees, and more.\n\nTry selecting one of the options below, or ask about a specific topic like "commercial leasing" or "how to buy a home."`,
    options: DEFAULT_OPTIONS,
  };
}

export function getWelcomeOptions(): ChatOption[] {
  return DEFAULT_OPTIONS;
}
