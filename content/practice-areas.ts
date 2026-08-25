export type PracticeArea = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  intro: string;
  services: { title: string; items: string[] }[];
  whyChoose?: string[];
  workflow?: { title: string; description: string }[];
  cta?: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "small-claims",
    title: "Small Claims Court Disputes",
    shortTitle: "Small Claims",
    summary:
      "Representation for monetary and property-related disputes within the Small Claims Court monetary limit of $50,000, including unpaid invoices, contract breaches, damages, and commercial lease conflicts.",
    intro:
      "We focus on strong evidence, clear submissions, and practical outcomes in Ontario Small Claims Court matters up to $50,000.",
    services: [
      {
        title: "Contract Breach & Performance Disputes",
        items: [
          "Breach of contract (failure to perform agreed terms)",
          "Partial performance or defective performance",
          "Delayed delivery of goods or services",
          "Failure to meet service standards or specifications",
          "Wrongful termination of a service or supply agreement",
          "Disputes over contract interpretation",
        ],
      },
      {
        title: "Supplier, Vendor & Dealership Disputes",
        items: [
          "Non-delivery of goods",
          "Delivery of defective or non-conforming goods",
          "Disputes over quality, quantity, or specifications",
          "Vendor non-performance",
          "Dealer/supplier payment disputes",
          "Disputes over purchase orders, invoices, or fulfillment",
        ],
      },
      {
        title: "Unpaid Invoices & Debt Recovery",
        items: [
          "Unpaid invoices for goods or services",
          "Outstanding accounts receivable",
          "Non-payment for completed work",
          "Payment disputes between businesses",
          "Collection actions for small business debts",
          "Enforcement of payment terms in service agreements",
        ],
      },
      {
        title: "Service Agreement Disputes",
        items: [
          "Poor workmanship or substandard services",
          "Failure to complete contracted work",
          "Overcharging or unauthorized charges",
          "Disputes over deliverables or milestones",
          "Refund disputes",
          "Professional service disputes (non-lawyer professions)",
        ],
      },
      {
        title: "Business-to-Business (B2B) Disputes",
        items: [
          "Contractor vs. subcontractor disputes",
          "Freelancer vs. client disputes",
          "Small business vs. supplier disputes",
          "Retailer vs. wholesaler disputes",
          "Independent contractor payment disputes",
          "Disputes over purchase agreements or service contracts",
        ],
      },
      {
        title: "Contractual Money Claims",
        items: [
          "Failure to pay or refund deposits",
          "Disputes over final payments",
          "Claims for damages caused by breach",
          "Claims for lost materials or wasted costs",
          "Claims for cancellation fees (if contractually valid)",
        ],
      },
    ],
    workflow: [
      {
        title: "Client Intake & Case Assessment",
        description:
          "Gather contracts, invoices, communications, and evidence to confirm the dispute type, legal standing, limitation period, and whether the claim fits within the Small Claims Court $50,000 limit.",
      },
      {
        title: "Demand Letter",
        description:
          "Prepare a formal demand outlining the breach, amount owed, and payment deadline.",
      },
      {
        title: "Plaintiff’s Claim",
        description:
          "Draft the claim (Form 7A), attach evidence, calculate damages, and file with the Small Claims Court.",
      },
      {
        title: "Service & Affidavit",
        description:
          "Serve the claim using an approved method, then file an Affidavit of Service.",
      },
      {
        title: "Settlement Conference",
        description:
          "Participate in a mandatory conference to attempt resolution and narrow issues.",
      },
      {
        title: "Trial Preparation & Attendance",
        description:
          "Organize exhibits, witness statements, and legal arguments for presentation before a judge.",
      },
      {
        title: "Enforce the Judgment",
        description:
          "Pursue enforcement options such as garnishment, writs of seizure and sale, or debtor examinations when appropriate.",
      },
    ],
  },
  {
    slug: "housing-tenancy",
    title: "Social Housing, Residential Tenancy & Commercial Lease Disputes",
    shortTitle: "Housing & Tenancy",
    summary:
      "Reliable legal support for individuals, landlords, tenants, and small businesses in Ontario housing and tenancy matters.",
    intro:
      "We specialize in housing and tenancy matters where clarity, strategy, and strong advocacy make all the difference. Services stay within authorized paralegal scope.",
    services: [
      {
        title: "Social Housing Disputes",
        items: [
          "Rent-Geared-to-Income (RGI) subsidy disputes",
          "Internal reviews and housing provider decisions",
          "Eviction threats related to subsidy changes",
          "Maintenance, repair, and habitability issues",
          "Human rights concerns involving discrimination or failure to accommodate",
          "Representation before the LTB, SBT, and HRTO",
        ],
      },
      {
        title: "Residential Tenancy — For Tenants",
        items: [
          "Maintenance and repair issues",
          "Illegal rent increases",
          "Harassment or interference with reasonable enjoyment",
          "Illegal entry by a landlord",
          "Wrongful eviction or bad-faith eviction claims",
          "Return of compensation related to renovations or personal-use evictions",
        ],
      },
      {
        title: "Residential Tenancy — For Landlords",
        items: [
          "Unpaid rent",
          "Damage to the rental unit",
          "Persistent late payment of rent",
          "Illegal activity in the unit",
          "Tenant interference with other tenants’ enjoyment",
          "Eviction applications permitted under the RTA",
        ],
      },
      {
        title: "Commercial Lease Disputes (Small Claims — Up to $50,000)",
        items: [
          "Unpaid commercial rent",
          "Claims for property damage",
          "Recovery of security deposits (where applicable)",
          "Breach of lease resulting in monetary losses",
          "Claims against a tenant’s personal guarantor",
          "Disputes over operating costs, utilities, or other amounts owing under the lease",
        ],
      },
    ],
    whyChoose: [
      "Clear, solution-focused guidance",
      "Professional representation at Ontario tribunals and Small Claims Court",
      "Transparent communication and step-by-step support",
      "Modern, trustworthy brand committed to client success",
    ],
    workflow: [
      {
        title: "Intake & Case Qualification",
        description:
          "Understand your situation, identify legal issues, and confirm the matter falls within our scope. Urgent cases receive immediate priority.",
      },
      {
        title: "Retainer & Onboarding",
        description:
          "Open your file, outline timelines, and provide a clear roadmap of what to expect.",
      },
      {
        title: "Evidence Collection",
        description:
          "Gather documents, notices, communications, photos, ledgers, and supporting records.",
      },
      {
        title: "Legal Analysis & Strategy",
        description:
          "Analyze your case under the Residential Tenancies Act, Housing Services Act, Human Rights Code, and Small Claims Rules.",
      },
      {
        title: "Filing Applications or Responses",
        description:
          "Prepare and file required materials with the appropriate tribunal or court.",
      },
      {
        title: "Negotiation & Early Resolution",
        description:
          "Pursue early resolution through negotiation or mediation where possible.",
      },
      {
        title: "Hearing Preparation & Representation",
        description:
          "Prepare you for the hearing and advocate on your behalf with evidence and submissions.",
      },
      {
        title: "Post-Decision Support & File Closure",
        description:
          "Review the decision, assist with enforcement or compliance, advise on next steps, and close the file professionally.",
      },
    ],
  },
  {
    slug: "benefits-tribunals",
    title: "Benefits & Tribunal Appeals Representation",
    shortTitle: "Benefits & Tribunals",
    summary:
      "Support for clients challenging decisions involving ODSP, Ontario Works, CPP Disability, Employment Insurance, and related benefit programs.",
    intro:
      "Comprehensive support for individuals facing denials, overpayments, suspensions, or complex appeal processes involving federal and provincial benefit programs.",
    services: [
      {
        title: "CPP Disability Appeals",
        items: [
          "CPP Disability benefit denials",
          "Medical eligibility disputes",
          "Insufficient contribution rulings",
          "Reconsideration and appeal preparation",
          "Evidence organization and medical documentation review",
          "Representation before the Social Security Tribunal (SST)",
        ],
      },
      {
        title: "Employment Insurance (EI) Appeals",
        items: [
          "Misconduct or voluntary leaving rulings",
          "Availability for work disputes",
          "Overpayment challenges",
          "Benefit denial appeals",
          "Reconsideration requests",
        ],
      },
      {
        title: "Ontario Works (OW) Benefits",
        items: [
          "Benefit suspensions or reductions",
          "Eligibility disputes",
          "Overpayment assessments",
          "Medical or disability-related issues",
          "Procedural fairness concerns at the Social Benefits Tribunal (SBT)",
        ],
      },
      {
        title: "Ontario Disability Support Program (ODSP) Appeals",
        items: [
          "Disability eligibility appeals",
          "Income or asset-related disputes",
          "Overpayment challenges",
          "Medical evidence preparation",
          "SBT hearing representation",
        ],
      },
    ],
    whyChoose: [
      "Clear, step-by-step guidance through complex appeal processes",
      "Strong written and oral advocacy at tribunal hearings",
      "Compassionate support for clients facing financial and medical hardship",
      "Professional representation at SST and SBT hearings",
    ],
  },
  {
    slug: "rsla-ppsa",
    title: "RSLA & PPSA Lien Disputes",
    shortTitle: "RSLA & PPSA",
    summary:
      "Focused support for repair shops, storage facilities, vehicle owners, lenders, and businesses in Repair and Storage Liens Act and Personal Property Security Act disputes.",
    intro:
      "Clear, strategic solutions that protect your financial and legal interests in Ontario lien matters.",
    services: [
      {
        title: "Repair and Storage Liens Act (RSLA)",
        items: [
          "Vehicle repair liens",
          "Storage liens",
          "Disputes over unpaid repair or storage fees",
          "Wrongful seizure or sale of vehicles",
          "Release of detained vehicles",
          "Priority disputes between lienholders and lenders",
        ],
      },
      {
        title: "Personal Property Security Act (PPSA)",
        items: [
          "Secured interest conflicts",
          "Improperly registered liens",
          "Wrongful seizure of personal property",
          "Priority disputes between creditors",
          "Enforcement or discharge of PPSA liens",
          "Errors or omissions in lien registration",
        ],
      },
    ],
    whyChoose: [
      "Clear, step-by-step guidance through lien disputes",
      "Strong advocacy in negotiations and Small Claims Court",
      "Professional, organized documentation and evidence preparation",
      "Transparent communication and practical solutions",
    ],
    workflow: [
      {
        title: "Initial File Intake & Case Review",
        description:
          "Collect repair invoices, storage records, lien notices, contracts, and communications.",
      },
      {
        title: "Lien Validity & Statutory Compliance Check",
        description:
          "Examine whether the lien was properly created, perfected, and enforced under Ontario law.",
      },
      {
        title: "Priority & Legal Position Assessment",
        description:
          "Analyze competing interests among lenders, repair shops, storage facilities, and owners.",
      },
      {
        title: "Evidence Preparation & Documentation",
        description:
          "Organize invoices, photos, contracts, statutory forms, and correspondence.",
      },
      {
        title: "Negotiation & Dispute Resolution",
        description:
          "Engage opposing parties to negotiate lien releases, payment arrangements, or settlement terms.",
      },
      {
        title: "Small Claims Court Filing & Hearing Advocacy",
        description:
          "Prepare and file documents when needed, and represent clients at trials, settlement conferences, and motions.",
      },
    ],
  },
  {
    slug: "immigration-refugee",
    title: "Immigration & Refugee Hearings Representation",
    shortTitle: "Immigration & Refugee",
    summary:
      "Client-focused representation across major Immigration and Refugee Board (IRB) divisions.",
    intro:
      "Your trusted advocate before the Immigration and Refugee Board. Our practice is built on precision, preparation, and advocacy for individuals navigating Canada’s immigration and refugee system.",
    services: [
      {
        title: "IRB Hearing Representation (RPD & IAD)",
        items: [
          "Refugee Protection Division (RPD) hearings",
          "Immigration Appeal Division (IAD) hearings",
          "Detailed evidence packages and legal submissions",
          "Strategic case presentations tailored to tribunal expectations",
        ],
      },
      {
        title: "Detention Reviews",
        items: [
          "Urgent representation at Detention Review hearings",
          "Challenges to continued detention",
          "Release plans and advocacy for fair, timely decisions",
        ],
      },
      {
        title: "Immigration Appeals (IAD)",
        items: [
          "Sponsorship refusal appeals",
          "Residency obligation breaches",
          "Removal order appeals",
          "Humanitarian and compassionate arguments where appropriate",
        ],
      },
      {
        title: "Refugee Appeals (RAD)",
        items: [
          "Refugee Appeal Division appeals",
          "Written submissions and legal arguments",
          "Evidence reviews to challenge errors in the initial decision",
        ],
      },
    ],
    whyChoose: [
      "Focused expertise in IRB hearings and appeals",
      "Clear communication and step-by-step guidance",
      "Strong advocacy for vulnerable clients",
      "Deep understanding of tribunal procedures",
      "Commitment to fairness, dignity, and justice",
    ],
    workflow: [
      {
        title: "Intake and Case Assessment",
        description:
          "Review refusal letters, detention grounds, deadlines, and determine the correct IRB division.",
      },
      {
        title: "Open File and Gather Documents",
        description:
          "Request GCMS notes, CBSA disclosure, identity documents, medical records, and supporting evidence.",
      },
      {
        title: "Track Deadlines and Develop Strategy",
        description:
          "Enter statutory deadlines and hearing dates, then build a tailored case theory.",
      },
      {
        title: "Prepare Evidence and Submissions",
        description:
          "Collect affidavits, timelines, country reports, and draft legal submissions.",
      },
      {
        title: "File, Prepare, and Attend Hearing",
        description:
          "Upload evidence, serve the Minister when required, conduct hearing preparation, and represent the client.",
      },
      {
        title: "Review the Decision",
        description:
          "Explain outcomes and plan next steps, such as judicial review or future applications.",
      },
    ],
    cta: "If you are facing an IRB hearing, detention review, immigration appeal, or refugee appeal, ProAct Legal Solutions is ready to stand with you. Contact us today to begin building a strong, strategic case for your future in Canada.",
  },
];

export function getPracticeArea(slug: string) {
  return practiceAreas.find((area) => area.slug === slug);
}
