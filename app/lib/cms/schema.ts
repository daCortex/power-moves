/**
 * Single source of truth for ALL editable site content.
 * The CMS admin edits this document; the site renders from it.
 * Icons / 3D geometry stay in code (keyed by index); everything textual lives here.
 */

export type Cta = { label: string; href: string };
export type NavItem = { label: string; href: string; desc: string; external?: boolean };
export type NavGroup = { label: string; items: NavItem[] };

export type SiteContent = {
  brand: { name1: string; name2: string; eyebrow: string };
  contact: { phones: string[]; emails: string[]; address: string; location: string };
  nav: { groups: NavGroup[]; flat: NavItem[]; cta: Cta };
  hero: {
    eyebrow: string;
    titleLines: string[];
    redWord: string;
    sub: string;
    ctas: Cta[];
    keyspecs: { k: string; u: string; l: string }[];
  };
  marquee: string[];
  capabilities: {
    index: string; kicker: string; title: string; sub: string;
    items: { no: string; title: string; tag: string; desc: string; points: string[]; metric: { k: string; l: string } }[];
  };
  epc: {
    index: string; kicker: string; title: string;
    intro: string;
    layers: { no: string; name: string; spec: string; desc: string; detail: string[] }[];
    stats: { k: string; l: string }[];
  };
  specs: {
    index: string; kicker: string; title: string; sub: string; statement: string;
    figures: { k: string; l: string }[];
    tables: { group: string; rows: [string, string][] }[];
  };
  products: {
    index: string; kicker: string; title: string; sub: string;
    items: { code: string; name: string; tag: string; blurb: string; specs: { l: string; v: string }[] }[];
  };
  process: { index: string; kicker: string; title: string; sub: string; steps: { no: string; title: string; desc: string }[] };
  industries: { index: string; kicker: string; title: string; sub: string; items: { name: string; note: string }[] };
  standards: {
    index: string; kicker: string; title: string; sub: string;
    certs: { code: string; title: string; note: string }[];
    standards: string[];
  };
  faq: { index: string; kicker: string; title: string; sub: string; items: { q: string; a: string }[] };
  cta: { index: string; kicker: string; title: string; redWord: string; body: string; ctas: Cta[]; stats: { k: string; l: string }[] };
  footer: { blurb: string; columns: { title: string; links: Cta[] }[]; copyright: string; location: string };
};

export const defaultContent: SiteContent = {
  brand: { name1: "Power", name2: "Moves", eyebrow: "Electrical · EPC · Supply" },
  contact: {
    phones: ["09-5506709", "09-5506710", "09-425751831"],
    emails: ["commercial.agh@agholding.com", "showroom.sales.agh@agholding.com"],
    address: "No. 501/503, Pyay Road (Corner of Pyi Yeik Thar Street), Kamaryut Township, Yangon, Myanmar",
    location: "Yangon · Myanmar",
  },
  nav: {
    groups: [
      {
        label: "Solutions",
        items: [
          { label: "Capabilities", href: "/#capabilities", desc: "What we do, end to end" },
          { label: "Inside an EPC panel", href: "/#anatomy", desc: "The 3D anatomy" },
          { label: "Process", href: "/process", desc: "From brief to power" },
        ],
      },
      {
        label: "Products",
        items: [
          { label: "Product range", href: "/#products", desc: "Datasheet explorer" },
          { label: "Specifications", href: "/specifications", desc: "Built to standard" },
          { label: "Industries", href: "/industries", desc: "Where we work" },
        ],
      },
      {
        label: "Company",
        items: [
          { label: "Standards & trust", href: "/specifications#standards", desc: "Credentials" },
          { label: "FAQ", href: "/faq", desc: "Straight answers" },
          { label: "Contact", href: "/#contact", desc: "Get in touch" },
        ],
      },
    ],
    flat: [],
    cta: { label: "Request a Quote", href: "/#contact" },
  },
  hero: {
    eyebrow: "Engineering · Supply · EPC Turnkey",
    titleLines: ["Power that moves", "industry forward."],
    redWord: "forward.",
    sub: "We supply the equipment, engineer the systems, and deliver them commissioned and ready — from a single transformer to a complete substation, built to standard and backed by real manufacturing.",
    ctas: [
      { label: "Request a Quote", href: "/#contact" },
      { label: "View Capabilities", href: "/#capabilities" },
    ],
    keyspecs: [
      { k: "≤ 33", u: "kV", l: "MV switchgear" },
      { k: "250", u: "+", l: "Projects" },
      { k: "24/7", u: "", l: "Support" },
      { k: "ISO", u: "★", l: "Certified" },
    ],
  },
  marquee: [
    "Licensed ABB Switchgear Supplier", "ISO-Certified Operations", "Power Transformer Manufacturing",
    "EPC Turnkey Engineering", "Medium-Voltage up to 33 kV", "Substation & Distribution Support", "Procurement-Ready Supply",
  ],
  capabilities: {
    index: "02", kicker: "What we do", title: "Capabilities", sub: "Select a discipline",
    items: [
      { no: "01", title: "Product Trading", tag: "SUPPLY", desc: "Procurement-ready supply of the components that build a network — sourced, stocked and delivered with manufacturing strength behind every quotation.", points: ["Transformers, switchgear, panels, cables & protection", "Direct, licensed supply lines (incl. ABB)", "Quotation to delivery, fully coordinated", "Genuine equipment, documented & warranted"], metric: { k: "5", l: "Product families" } },
      { no: "02", title: "EPC Turnkey", tag: "ENGINEER · BUILD", desc: "One accountable partner from requirement review to commissioning — engineering, procurement and construction handed over ready to energize.", points: ["Requirement review & system design", "Sourcing, delivery & site coordination", "Installation supervision & commissioning", "Single point of responsibility"], metric: { k: "E→C", l: "End to end" } },
      { no: "03", title: "Substations", tag: "GRID", desc: "Equipment supply and engineering coordination for utility networks and distribution upgrades — built to keep the grid stable, safe and online.", points: ["Package & conventional substations", "Primary & secondary distribution", "Protection & control coordination", "Network upgrade support"], metric: { k: "≤33", l: "kV class" } },
      { no: "04", title: "Industrial Power", tag: "FACILITY", desc: "Distribution, control and protection systems for factories and infrastructure — engineered for uptime, safety and the loads of real operations.", points: ["LV & MV distribution systems", "Motor control & protection", "Power factor & energy efficiency", "Commercial & infrastructure builds"], metric: { k: "24/7", l: "For uptime" } },
    ],
  },
  epc: {
    index: "03", kicker: "Anatomy", title: "Inside an EPC Panel",
    intro: "Every Power Moves turnkey build is engineered as a complete assembly.",
    layers: [
      { no: "01", name: "Control Fascia", spec: "IP54 door · HMI & indicators", desc: "The operator-facing door — instrumentation, controls and status at a glance.", detail: ["IP54-rated lockable door", "HMI / mimic & indicator lamps", "Push-buttons & selector switches", "Door-mounted metering"] },
      { no: "02", name: "Metering & Protection", spec: "Numerical relays · CT / VT", desc: "The brain — relays that watch every circuit and trip in milliseconds.", detail: ["Numerical protection relays", "Current & voltage transformers", "Energy & power metering", "Selective trip coordination"] },
      { no: "03", name: "Breaker Array", spec: "MCCB / ACB · selective", desc: "The muscle — breakers that make, carry and break fault current safely.", detail: ["MCCB / ACB / VCB devices", "Withdrawable or fixed pattern", "Mechanically interlocked", "Short-circuit rated"] },
      { no: "04", name: "Busbar System", spec: "Tinned copper · up to 6300 A", desc: "The spine — copper bars distributing power across the whole assembly.", detail: ["Tinned copper busbars", "Rated up to 6300 A", "Insulated & shrouded", "Fault-withstand braced"] },
      { no: "05", name: "Transformer Module", spec: "Step-down · ≤ 33 kV", desc: "The converter — stepping voltage to the level your site actually needs.", detail: ["Step-down to LV / MV", "Oil-immersed or dry-type", "Built to IEC 60076", "Temperature monitored"] },
      { no: "06", name: "Form-4 Enclosure", spec: "Compartmented steel frame", desc: "The shell — a compartmented steel frame that holds and segregates it all.", detail: ["Form-4 segregation", "Powder-coated steel", "Cable entry & gland plates", "Floor or wall mounting"] },
    ],
    stats: [
      { k: "06", l: "Integrated layers" }, { k: "≤33 kV", l: "Voltage class" },
      { k: "Form 4", l: "Switchboard" }, { k: "1", l: "Accountable partner" },
    ],
  },
  specs: {
    index: "05", kicker: "Technical", title: "Specifications", sub: "Built to standard",
    statement: "Every panel, board and substation we supply is engineered to the relevant IEC standards and delivered with full test and compliance documentation — so what you specify is exactly what arrives on site.",
    figures: [{ k: "33", l: "kV class" }, { k: "6300", l: "A busbar" }, { k: "IEC", l: "compliant" }],
    tables: [
      { group: "Voltage & ratings", rows: [["MV switchgear", "up to 33 kV"], ["LV systems", "≤ 1000 V"], ["Busbar rating", "up to 6300 A"], ["Transformers", "distribution & power class"]] },
      { group: "Build & standards", rows: [["Switchgear forms", "Form 1–4b"], ["Enclosure rating", "IP31 – IP54"], ["MV / LV standards", "IEC 62271 · 61439"], ["Transformer standard", "IEC 60076"]] },
      { group: "Delivery & support", rows: [["Engagement", "EPC turnkey or supply-only"], ["Lead time", "quoted per order"], ["Documentation", "full test & compliance"], ["Support", "24/7"]] },
    ],
  },
  products: {
    index: "04", kicker: "Product range", title: "Datasheet Explorer", sub: "Tap a product · read the spec",
    items: [
      { code: "PM-TX", name: "Power Transformers", tag: "Distribution & power class", blurb: "In-house manufacturing capability for dependable step-up and step-down power, built and tested to specification.", specs: [{ l: "Type", v: "Oil-immersed / Dry" }, { l: "Rating", v: "Up to 33 kV class" }, { l: "Cooling", v: "ONAN / ONAF" }, { l: "Standard", v: "IEC 60076" }, { l: "Lead time", v: "Quoted per order" }] },
      { code: "PM-MV", name: "Medium-Voltage Switchgear", tag: "Up to 33 kV", blurb: "Protection and control for substation and primary distribution networks, with metal-clad and metal-enclosed options.", specs: [{ l: "Voltage", v: "12 / 24 / 33 kV" }, { l: "Construction", v: "Metal-clad" }, { l: "Breaker", v: "Vacuum / SF6" }, { l: "Standard", v: "IEC 62271" }, { l: "Supply", v: "Licensed (ABB)" }] },
      { code: "PM-LV", name: "Low-Voltage Switchgear", tag: "Distribution & motor control", blurb: "Robust LV assemblies for industrial and commercial installations — distribution boards through full MCC line-ups.", specs: [{ l: "Voltage", v: "≤ 1000 V" }, { l: "Form", v: "Form 1–4b" }, { l: "Rating", v: "Up to 6300 A" }, { l: "Standard", v: "IEC 61439" }, { l: "Build", v: "Custom assembly" }] },
      { code: "PM-PB", name: "Panels & Distribution Boards", tag: "Custom-built assemblies", blurb: "Engineered panelboards and distribution boards built to your specification, schedule and standard.", specs: [{ l: "Type", v: "DB / MDB / SMDB" }, { l: "Enclosure", v: "IP31–IP54" }, { l: "Busbar", v: "Copper / Tinned" }, { l: "Finish", v: "Powder-coated" }, { l: "Build", v: "Made to order" }] },
      { code: "PM-PS", name: "Package Substations", tag: "Compact & ready-to-install", blurb: "Pre-engineered, factory-built units for fast, dependable deployment — transformer, MV and LV in one enclosure.", specs: [{ l: "Config", v: "TX + MV + LV" }, { l: "Rating", v: "Up to 33 kV" }, { l: "Install", v: "Outdoor / indoor" }, { l: "Delivery", v: "Skid-mounted" }, { l: "Standard", v: "IEC 62271-202" }] },
      { code: "PM-PR", name: "Protection Equipment", tag: "Relays, breakers & cables", blurb: "The components that keep every network safe, selective and supplied — protection relays, breakers, CTs/VTs and cable.", specs: [{ l: "Relays", v: "Numerical / digital" }, { l: "Breakers", v: "ACB / MCCB / VCB" }, { l: "Instr.", v: "CT / VT" }, { l: "Cable", v: "LV & MV grades" }, { l: "Standard", v: "IEC compliant" }] },
    ],
  },
  process: {
    index: "06", kicker: "How we work", title: "From Brief to Power", sub: "Five stages · one partner",
    steps: [
      { no: "01", title: "Consult", desc: "We review your requirement, load profile and site — and translate it into a clear electrical scope you can sign off on." },
      { no: "02", title: "Engineer", desc: "Our engineers design the system — ratings, protection, single-line diagrams and equipment selection to standard." },
      { no: "03", title: "Source", desc: "We procure genuine, documented equipment through our licensed supply lines, with quotation transparency throughout." },
      { no: "04", title: "Deliver", desc: "Equipment is delivered, installation supervised and the system commissioned and tested on site." },
      { no: "05", title: "Support", desc: "Handover, documentation and ongoing support — so what we deliver keeps running, 24/7." },
    ],
  },
  industries: {
    index: "07", kicker: "Where we work", title: "Industries Served", sub: "Power that can't fail",
    items: [
      { name: "Utility Substations", note: "Grid & transmission" }, { name: "Industrial Factories", note: "Process & manufacturing" },
      { name: "Commercial Buildings", note: "Towers & complexes" }, { name: "Energy Infrastructure", note: "Generation & renewables" },
      { name: "Distribution Networks", note: "Upgrades & extensions" }, { name: "Infrastructure", note: "Civil & development" },
    ],
  },
  standards: {
    index: "08", kicker: "Credentials", title: "Standards & Trust", sub: "Built to spec, by the book",
    certs: [
      { code: "ABB", title: "Licensed Switchgear Supplier", note: "Genuine, warranted equipment" },
      { code: "ISO", title: "ISO-Certified Operations", note: "Quality management system" },
      { code: "IEC", title: "IEC-Compliant Engineering", note: "60076 · 61439 · 62271" },
      { code: "AGH", title: "Asia General Holding Group", note: "Backed manufacturing strength" },
    ],
    standards: ["IEC 60076 — Power Transformers", "IEC 62271 — HV Switchgear", "IEC 61439 — LV Assemblies", "IEC 62271-202 — Package Substations"],
  },
  faq: {
    index: "09", kicker: "Questions", title: "Frequently Asked", sub: "Straight answers",
    items: [
      { q: "What exactly does Power Moves do?", a: "Three things, under one roof: we supply electrical equipment, we engineer the systems around it, and we deliver complete EPC turnkey projects — commissioned and ready to run. You can engage us for a single transformer or a full substation." },
      { q: "Are you a genuine ABB supplier?", a: "Yes. We are a licensed ABB switchgear supplier, so the equipment we quote is genuine, documented and warranted — not grey-market stock." },
      { q: "What voltage levels do you handle?", a: "We work across low voltage (≤ 1000 V) through medium voltage up to the 33 kV class, covering distribution boards, LV/MV switchgear, transformers and package substations." },
      { q: "Can you handle the whole project, start to finish?", a: "That's our EPC turnkey model. From requirement review and system design through sourcing, delivery, installation supervision and commissioning — one accountable partner, one point of responsibility." },
      { q: "Which standards do you build to?", a: "Our equipment and engineering follow the relevant IEC standards — IEC 60076, IEC 62271, IEC 61439 and IEC 62271-202 — backed by ISO-certified operations." },
      { q: "How do I get a quotation?", a: "Send us your requirement — load, voltage, site and scope. We'll review it and come back with a clear, itemized quotation." },
    ],
  },
  cta: {
    index: "10", kicker: "The Power Moves promise", title: "Manufacturing strength behind", redWord: "every quotation.",
    body: "Backed by ISO-certified operations and a licensed ABB supply line, we pair real manufacturing capability with hands-on engineering — so what we quote is exactly what we deliver.",
    ctas: [{ label: "Start Your Project", href: "/#contact" }, { label: "View Product Range", href: "/#products" }],
    stats: [{ k: "≤33 kV", l: "Voltage class" }, { k: "5", l: "Product families" }, { k: "IEC", l: "Compliant" }, { k: "24/7", l: "Support" }],
  },
  footer: {
    blurb: "Electrical engineering, product supply and EPC turnkey solutions for modern power infrastructure.",
    columns: [
      { title: "Solutions", links: [{ label: "Product Trading", href: "/#capabilities" }, { label: "EPC Turnkey", href: "/#capabilities" }, { label: "Substations", href: "/#capabilities" }, { label: "Industrial Power", href: "/#capabilities" }] },
      { title: "Products", links: [{ label: "Transformers", href: "/#products" }, { label: "MV Switchgear", href: "/#products" }, { label: "LV Switchgear", href: "/#products" }, { label: "Package Substations", href: "/#products" }] },
      { title: "Company", links: [{ label: "Process", href: "/process" }, { label: "Industries", href: "/industries" }, { label: "Standards", href: "/specifications#standards" }, { label: "FAQ", href: "/faq" }] },
    ],
    copyright: "© 2026 Power Moves · Asia General Holding",
    location: "Yangon · Myanmar",
  },
};
