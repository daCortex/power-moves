/**
 * Single source of truth for ALL editable site content.
 * The CMS admin edits this document; the site renders from it.
 * Icons / 3D geometry stay in code (keyed by index); everything textual lives here.
 *
 * Layout/identity = Power Moves' own design. Figures/facts = accurate AG Holding info.
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
    items: { code: string; name: string; tag: string; blurb: string; img: string; specs: { l: string; v: string }[] }[];
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
  brand: { name1: "Power", name2: "Moves", eyebrow: "Transformers · ABB-Licensed Switchgear" },
  contact: {
    phones: ["09-5506709", "09-5506710", "09-425751831"],
    emails: ["commercial.agh@agholding.com", "showroom.sales.agh@agholding.com"],
    address: "No. 501/503, Pyay Road (Corner of Pyi Yeik Thar Street), Kamaryut Township, Yangon, Myanmar",
    location: "Yangon · Myanmar",
  },
  nav: {
    groups: [
      { label: "About", items: [
        { label: "Overview", href: "/about", desc: "The key to smart power" },
        { label: "MD Message", href: "/about#md", desc: "From our Managing Director" },
        { label: "Corporate Governance", href: "/about#governance", desc: "How we operate" },
        { label: "Location & Address", href: "/contact", desc: "Find & reach us" },
      ] },
      { label: "Products", items: [
        { label: "Power Transformers", href: "/products#transformer", desc: "Up to 230 kV / 150 MVA" },
        { label: "Panels & Switchgear", href: "/products#panel", desc: "ABB-licensed, up to 40.5 kV" },
        { label: "Components", href: "/products#ancillary", desc: "Ancillary apparatus" },
        { label: "All products", href: "/products", desc: "Full catalog" },
      ] },
    ],
    flat: [
      { label: "Downloads", href: "/downloads", desc: "" },
      { label: "News", href: "/news", desc: "" },
      { label: "Support", href: "/support", desc: "" },
      { label: "Careers", href: "/careers", desc: "" },
    ],
    cta: { label: "Request a Quote", href: "/contact" },
  },
  hero: {
    eyebrow: "High-Voltage Transformers · ABB-Licensed Switchgear",
    titleLines: ["Power that moves", "industry forward."],
    redWord: "forward.",
    sub: "Power transformers up to 230 kV / 150 MVA and ABB-licensed switchgear — manufactured, type-tested and supported to international standard from our Yangon facility.",
    ctas: [
      { label: "Request a Quote", href: "/#contact" },
      { label: "View Capabilities", href: "/#capabilities" },
    ],
    keyspecs: [
      { k: "230", u: " kV", l: "Max voltage" },
      { k: "150", u: " MVA", l: "Peak capacity" },
      { k: "40.5", u: " kV", l: "Switchgear" },
      { k: "DEKRA", u: "", l: "Type-tested" },
    ],
  },
  marquee: [
    "ABB-Licensed Switchgear", "DEKRA Type-Tested", "KERI Validated", "Tecnalia Certified",
    "ISO 9001", "Transformers up to 230 kV / 150 MVA", "Switchgear up to 40.5 kV · 31.5 kA", "24/7 After-Sales",
  ],
  capabilities: {
    index: "02", kicker: "What we do", title: "Capabilities", sub: "Select a discipline",
    items: [
      { no: "01", title: "Transformers", tag: "MANUFACTURE", desc: "Power and distribution transformers from compact distribution units to 230 kV / 150 MVA transmission class, built and type-tested in our Yangon facility.", points: ["Up to 230 kV / 150 MVA", "Oil-immersed & cast-resin", "DEKRA / KERI type-tested", "Built to IEC 60076"], metric: { k: "230", l: "kV class" } },
      { no: "02", title: "Panels & Switchgear", tag: "ABB-LICENSED", desc: "ABB-licensed medium- and low-voltage switchgear, ring main units and protection panels — assembled and tested to standard.", points: ["ABB license agreement", "Up to 40.5 kV · 31.5 kA", "Internal-arc classified", "MV & LV assemblies"], metric: { k: "40.5", l: "kV switchgear" } },
      { no: "03", title: "EPC & Substations", tag: "ENGINEER · BUILD", desc: "One accountable partner from requirement review to energized commissioning — engineering, supply and construction for utility and distribution networks.", points: ["System design & coordination", "Package & conventional substations", "Protection & control", "Single point of responsibility"], metric: { k: "E→C", l: "End to end" } },
      { no: "04", title: "After-Sales Services", tag: "SERVICE", desc: "Field commissioning, oil filtration, condition monitoring and a 24/7 emergency maintenance desk with nationwide coverage.", points: ["On-site oil processing", "Condition monitoring", "Nationwide coverage", "24 / 7 response"], metric: { k: "24/7", l: "Support" } },
    ],
  },
  epc: {
    index: "03", kicker: "Anatomy", title: "Inside an EPC Panel",
    intro: "Every assembly we build is engineered as a complete, type-tested unit.",
    layers: [
      { no: "01", name: "Control Fascia", spec: "IP54 door · HMI & indicators", desc: "The operator-facing door — instrumentation, controls and status at a glance.", detail: ["IP54-rated lockable door", "HMI / mimic & indicator lamps", "Push-buttons & selector switches", "Door-mounted metering"] },
      { no: "02", name: "Metering & Protection", spec: "Numerical relays · CT / VT", desc: "The brain — relays that watch every circuit and trip in milliseconds.", detail: ["Numerical protection relays", "Current & voltage transformers", "Energy & power metering", "Selective trip coordination"] },
      { no: "03", name: "Breaker Array", spec: "ABB VCB · 31.5 kA", desc: "The muscle — breakers that make, carry and break fault current safely.", detail: ["ABB vacuum circuit breakers", "Up to 31.5 kA short-circuit", "Mechanically interlocked", "Internal-arc classified"] },
      { no: "04", name: "Busbar System", spec: "Tinned copper · up to 4000 A", desc: "The spine — copper bars distributing power across the whole assembly.", detail: ["Tinned copper busbars", "Rated up to 4000 A", "Insulated & shrouded", "Fault-withstand braced"] },
      { no: "05", name: "Transformer Module", spec: "≤ 230 kV / 150 MVA", desc: "The converter — stepping voltage to the level the grid needs.", detail: ["Oil-immersed or cast-resin", "Up to 230 kV / 150 MVA", "DEKRA / KERI type-tested", "Temperature monitored"] },
      { no: "06", name: "Form-4 Enclosure", spec: "Compartmented steel frame", desc: "The shell — a compartmented steel frame that holds and segregates it all.", detail: ["Form-4 segregation", "Powder-coated steel", "Cable entry & gland plates", "Floor or wall mounting"] },
    ],
    stats: [
      { k: "06", l: "Integrated layers" }, { k: "40.5 kV", l: "Switchgear class" },
      { k: "31.5 kA", l: "Fault rating" }, { k: "1", l: "Accountable supplier" },
    ],
  },
  specs: {
    index: "05", kicker: "Technical", title: "Specifications", sub: "Built to standard",
    statement: "Every transformer, panel and substation we supply is engineered to international standards and independently type-tested by accredited laboratories — so what you specify is exactly what arrives on site.",
    figures: [{ k: "DEKRA", l: "type-tested" }, { k: "ABB", l: "licensee" }, { k: "ISO", l: "9001" }],
    tables: [
      { group: "Transformers", rows: [["Voltage class", "up to 230 kV"], ["Capacity", "up to 150 MVA"], ["Type", "oil-immersed / cast-resin"], ["Standard", "IEC 60076 · DEKRA / KERI"]] },
      { group: "Switchgear", rows: [["Voltage", "up to 40.5 kV"], ["Short-circuit", "31.5 kA"], ["Technology", "ABB-licensed"], ["Classification", "internal-arc"]] },
      { group: "Delivery & support", rows: [["Engagement", "supply or turnkey"], ["Commissioning", "field + oil processing"], ["Documentation", "full test & compliance"], ["Support", "24 / 7 nationwide"]] },
    ],
  },
  products: {
    index: "04", kicker: "Product range", title: "Datasheet Explorer", sub: "Tap a product · read the spec",
    items: [
      { code: "PM-TX", name: "Power Transformers", tag: "Up to 230 kV / 150 MVA", img: "/photos/power-transformer.jpg", blurb: "Power and distribution transformers built and type-tested in our Yangon facility — from compact distribution units to transmission class.", specs: [{ l: "Voltage", v: "Up to 230 kV" }, { l: "Capacity", v: "Up to 150 MVA" }, { l: "Type", v: "Oil-immersed / cast-resin" }, { l: "Standard", v: "IEC 60076 · DEKRA / KERI" }, { l: "Cooling", v: "ONAN / ONAF" }] },
      { code: "PM-MV", name: "Medium-Voltage Switchgear", tag: "ABB-licensed · up to 40.5 kV", img: "/photos/factory.jpg", blurb: "ABB-licensed metal-clad switchgear and ring main units for substation and primary distribution networks.", specs: [{ l: "Voltage", v: "12 / 24 / 40.5 kV" }, { l: "Short-circuit", v: "31.5 kA" }, { l: "Construction", v: "Metal-clad" }, { l: "Technology", v: "ABB-licensed" }, { l: "Class", v: "Internal-arc" }] },
      { code: "PM-LV", name: "Low-Voltage Switchgear", tag: "Distribution & motor control", img: "/photos/factory-2.jpg", blurb: "Robust LV assemblies for industrial and commercial installations — distribution boards through full MCC line-ups.", specs: [{ l: "Voltage", v: "≤ 1000 V" }, { l: "Form", v: "Form 1–4b" }, { l: "Rating", v: "Up to 4000 A" }, { l: "Standard", v: "IEC 61439" }, { l: "Build", v: "Custom assembly" }] },
      { code: "PM-PB", name: "Panels & Distribution Boards", tag: "Custom-built assemblies", img: "/photos/factory.jpg", blurb: "Engineered panelboards and distribution boards built to your specification, schedule and standard.", specs: [{ l: "Type", v: "DB / MDB / SMDB" }, { l: "Enclosure", v: "IP31–IP54" }, { l: "Busbar", v: "Copper / tinned" }, { l: "Finish", v: "Powder-coated" }, { l: "Build", v: "Made to order" }] },
      { code: "PM-PS", name: "Package Substations", tag: "Compact & ready-to-install", img: "/photos/power-transformer.jpg", blurb: "Pre-engineered, factory-built units for fast, dependable deployment — transformer, MV and LV in one enclosure.", specs: [{ l: "Config", v: "TX + MV + LV" }, { l: "Rating", v: "Up to 230 kV" }, { l: "Install", v: "Outdoor / indoor" }, { l: "Delivery", v: "Skid-mounted" }, { l: "Standard", v: "IEC 62271-202" }] },
      { code: "PM-PR", name: "Protection Equipment", tag: "Relays, breakers & cables", img: "/photos/factory-2.jpg", blurb: "The components that keep every network safe, selective and supplied — protection relays, ABB breakers, CTs/VTs and cable.", specs: [{ l: "Relays", v: "Numerical / digital" }, { l: "Breakers", v: "ABB VCB / ACB / MCCB" }, { l: "Instr.", v: "CT / VT" }, { l: "Cable", v: "LV & MV grades" }, { l: "Standard", v: "IEC compliant" }] },
    ],
  },
  process: {
    index: "06", kicker: "How we work", title: "From Brief to Power", sub: "Five stages · one partner",
    steps: [
      { no: "01", title: "Consult", desc: "We review your requirement, load profile and site — and translate it into a clear electrical scope you can sign off on." },
      { no: "02", title: "Engineer", desc: "Our engineers design the system — ratings, protection, single-line diagrams and equipment selection to standard." },
      { no: "03", title: "Manufacture", desc: "Transformers and ABB-licensed panels are built and type-tested in our Yangon facility." },
      { no: "04", title: "Deliver", desc: "Equipment is delivered, installation supervised and the system commissioned and tested on site." },
      { no: "05", title: "Support", desc: "Handover, documentation and 24/7 after-sales support — oil processing, condition monitoring and nationwide response." },
    ],
  },
  industries: {
    index: "07", kicker: "Where we work", title: "Industries Served", sub: "Power that can't fail",
    items: [
      { name: "Utility Substations", note: "Transmission & distribution" }, { name: "Industrial Factories", note: "Process & manufacturing" },
      { name: "Commercial Buildings", note: "Towers & complexes" }, { name: "Energy Infrastructure", note: "Generation & renewables" },
      { name: "Distribution Networks", note: "Upgrades & extensions" }, { name: "Infrastructure", note: "Civil & development" },
    ],
  },
  standards: {
    index: "08", kicker: "Credentials", title: "Independently tested. Globally compliant.", sub: "Witnessed by accredited labs",
    certs: [
      { code: "DEKRA", title: "Type Test Certificate", note: "Netherlands · transmission class" },
      { code: "KERI", title: "Performance Validation", note: "Korea · transformer testing" },
      { code: "ABB", title: "Switchgear Licensee", note: "Licensed MV / LV technology" },
      { code: "ISO", title: "ISO 9001", note: "Quality management system" },
    ],
    standards: ["IEC 60076 — Power Transformers", "IEC 62271 — HV Switchgear", "IEC 61439 — LV Assemblies", "DEKRA / KERI / Tecnalia type tests"],
  },
  faq: {
    index: "09", kicker: "Questions", title: "Frequently Asked", sub: "Straight answers",
    items: [
      { q: "What does Power Moves manufacture?", a: "Power and distribution transformers up to 230 kV / 150 MVA, and ABB-licensed medium- and low-voltage switchgear, panels and ring main units — built and tested at our Yangon facility." },
      { q: "Are your products independently tested?", a: "Yes. Our equipment is type-tested and validated by accredited third-party laboratories including DEKRA, KERI and Tecnalia, and built under an ABB license agreement and ISO 9001 quality system." },
      { q: "What voltage and fault levels do you handle?", a: "Transformers up to the 230 kV / 150 MVA transmission class, and switchgear up to 40.5 kV with a 31.5 kA short-circuit rating, internal-arc classified." },
      { q: "Do you handle installation and commissioning?", a: "We offer supply-only or full turnkey delivery — including field commissioning, oil filtration, condition monitoring and a 24/7 emergency maintenance desk with nationwide coverage." },
      { q: "How do I get a quotation?", a: "Send us your requirement — load, voltage, site and scope. We'll review it and return a clear, itemized quotation." },
    ],
  },
  cta: {
    index: "10", kicker: "The Power Moves promise", title: "Manufacturing strength behind", redWord: "every quotation.",
    body: "Transformers up to 230 kV / 150 MVA and ABB-licensed switchgear, type-tested by DEKRA and KERI — paired with hands-on engineering, so what we quote is exactly what we deliver.",
    ctas: [{ label: "Start Your Project", href: "/#contact" }, { label: "View Product Range", href: "/#products" }],
    stats: [{ k: "230 kV", l: "Max voltage" }, { k: "150 MVA", l: "Peak capacity" }, { k: "DEKRA", l: "Type-tested" }, { k: "24/7", l: "Support" }],
  },
  footer: {
    blurb: "High-voltage power transformers and ABB-licensed switchgear, manufactured and supported in Yangon.",
    columns: [
      { title: "Products", links: [{ label: "Power Transformers", href: "/products#transformer" }, { label: "Panels & Switchgear", href: "/products#panel" }, { label: "Components", href: "/products#ancillary" }, { label: "Downloads", href: "/downloads" }] },
      { title: "Company", links: [{ label: "About", href: "/about" }, { label: "News", href: "/news" }, { label: "Careers", href: "/careers" }, { label: "Support", href: "/support" }] },
      { title: "Contact", links: [{ label: "Contact us", href: "/contact" }, { label: "Request a Quote", href: "/contact" }, { label: "Showroom visit", href: "/contact" }, { label: "Specifications", href: "/downloads" }] },
    ],
    copyright: "© 2026 Power Moves · Asia General Holding",
    location: "Yangon · Myanmar",
  },
};
