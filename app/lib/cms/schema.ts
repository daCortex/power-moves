/**
 * Single source of truth for ALL editable site content.
 * The CMS admin edits this document; the site renders from it.
 * Structure mirrors agholding.com (Hero · Welcome · Certificates · Projects · MD).
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
    title: string;
    sub: string;
    ctas: Cta[];
    slides: { src: string; alt: string; caption: string }[];
    stats: { v: string; suffix: string; l: string }[];
  };
  certStrip: { items: string[] };

  welcome: {
    index: string; kicker: string; title: string; sub: string;
    columns: { no: string; title: string; desc: string; points: string[] }[];
  };

  epc: {
    index: string; kicker: string; title: string; intro: string;
    layers: { no: string; name: string; spec: string; desc: string; detail: string[] }[];
    stats: { k: string; l: string }[];
  };

  specs: {
    index: string; kicker: string; title: string; sub: string; statement: string;
    figures: { k: string; l: string }[];
    tables: { group: string; rows: [string, string][] }[];
  };

  projects: {
    index: string; kicker: string; title: string; sub: string;
    items: { name: string; location: string; rating: string; voltage: string; status: string; img: string }[];
  };

  md: {
    index: string; kicker: string; title: string;
    name: string; role: string; photo: string; paragraphs: string[];
  };

  /* secondary / page content */
  capabilities: { index: string; kicker: string; title: string; sub: string; items: { no: string; title: string; tag: string; desc: string; points: string[]; metric: { k: string; l: string } }[] };
  process: { index: string; kicker: string; title: string; sub: string; steps: { no: string; title: string; desc: string }[] };
  industries: { index: string; kicker: string; title: string; sub: string; items: { name: string; note: string }[] };
  standards: { index: string; kicker: string; title: string; sub: string; certs: { code: string; title: string; note: string }[]; standards: string[] };
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
      { label: "Products", items: [
        { label: "Power Transformers", href: "/#products", desc: "Up to 230 kV / 150 MVA" },
        { label: "Panels & Switchgear", href: "/#products", desc: "ABB-licensed, up to 40.5 kV" },
        { label: "After-Sales Services", href: "/#products", desc: "Commissioning & maintenance" },
      ] },
      { label: "Evidence", items: [
        { label: "Projects", href: "/#projects", desc: "Delivered across the grid" },
        { label: "Certifications", href: "/#certs", desc: "DEKRA · KERI · ABB · ISO" },
        { label: "Specifications", href: "/specifications", desc: "Built to standard" },
      ] },
      { label: "Company", items: [
        { label: "MD Message", href: "/#md", desc: "From our Managing Director" },
        { label: "Industries", href: "/industries", desc: "Where we work" },
        { label: "FAQ", href: "/faq", desc: "Straight answers" },
      ] },
    ],
    flat: [],
    cta: { label: "Request a Quote", href: "/#contact" },
  },

  hero: {
    eyebrow: "High-Voltage Power Transformers · ABB-Licensed Switchgear",
    title: "Engineering the backbone of the grid.",
    sub: "Power transformers up to 230 kV / 150 MVA and ABB-licensed switchgear — manufactured and type-tested to international standard at our Yangon facility.",
    ctas: [{ label: "Explore capabilities", href: "/#products" }, { label: "View certifications", href: "/#certs" }],
    slides: [
      { src: "/photos/factory.jpg", alt: "Manufacturing facility, Yangon", caption: "Yangon manufacturing facility" },
      { src: "/photos/power-transformer.jpg", alt: "230 kV power transformers at substation", caption: "230 kV substation — commissioned" },
      { src: "/photos/factory-2.jpg", alt: "Aerial view of the transformer plant", caption: "Transformer plant — aerial view" },
    ],
    stats: [
      { v: "230", suffix: " kV", l: "Max voltage" },
      { v: "150", suffix: " MVA", l: "Peak capacity" },
      { v: "40.5", suffix: " kV", l: "Switchgear class" },
    ],
  },

  certStrip: {
    items: ["DEKRA Type-Tested", "KERI Validated", "Tecnalia Certified", "ABB Licensee", "ISO 9001", "Internal-Arc Classified", "230 kV / 150 MVA"],
  },

  welcome: {
    index: "01", kicker: "What we deliver", title: "Three disciplines. One integrated supplier.",
    sub: "From core lamination to energized commissioning, we deliver the full transmission and distribution value chain.",
    columns: [
      { no: "01", title: "Transformers", desc: "Power and distribution transformers from 100 kVA pad-mount units to 230 kV / 150 MVA transmission class.", points: ["Up to 230 kV / 150 MVA", "Cast-resin & oil-immersed", "DEKRA / KERI type-tested"] },
      { no: "02", title: "Panels & Switchgear", desc: "ABB-licensed medium- and low-voltage switchgear, ring main units and protection panels.", points: ["ABB license agreement", "Up to 40.5 kV · 31.5 kA", "Internal-arc classified"] },
      { no: "03", title: "After-Sales Services", desc: "Field commissioning, oil filtration, condition monitoring and a 24/7 emergency maintenance desk.", points: ["On-site oil processing", "Nationwide coverage", "24 / 7 response"] },
    ],
  },

  epc: {
    index: "03", kicker: "Anatomy", title: "Inside a power panel", intro: "Every assembly we build is engineered as a complete, type-tested unit.",
    layers: [
      { no: "01", name: "Control Fascia", spec: "IP54 door · HMI & indicators", desc: "The operator-facing door — instrumentation, controls and status at a glance.", detail: ["IP54-rated lockable door", "HMI / mimic & indicator lamps", "Push-buttons & selector switches", "Door-mounted metering"] },
      { no: "02", name: "Metering & Protection", spec: "Numerical relays · CT / VT", desc: "The brain — relays that watch every circuit and trip in milliseconds.", detail: ["Numerical protection relays", "Current & voltage transformers", "Energy & power metering", "Selective trip coordination"] },
      { no: "03", name: "Breaker Array", spec: "ABB VCB · 31.5 kA", desc: "The muscle — breakers that make, carry and break fault current safely.", detail: ["ABB vacuum circuit breakers", "Up to 31.5 kA", "Mechanically interlocked", "Internal-arc classified"] },
      { no: "04", name: "Busbar System", spec: "Tinned copper · up to 4000 A", desc: "The spine — copper bars distributing power across the whole assembly.", detail: ["Tinned copper busbars", "Rated up to 4000 A", "Insulated & shrouded", "Fault-withstand braced"] },
      { no: "05", name: "Transformer Module", spec: "≤ 230 kV / 150 MVA", desc: "The converter — stepping voltage to the level the grid needs.", detail: ["Oil-immersed or cast-resin", "Up to 230 kV / 150 MVA", "DEKRA / KERI type-tested", "Temperature monitored"] },
      { no: "06", name: "Enclosure", spec: "Compartmented steel frame", desc: "The shell — a compartmented steel frame that holds and segregates it all.", detail: ["Form-segregated", "Powder-coated steel", "Cable entry & gland plates", "Floor or wall mounting"] },
    ],
    stats: [{ k: "06", l: "Integrated layers" }, { k: "40.5 kV", l: "Switchgear class" }, { k: "31.5 kA", l: "Fault rating" }, { k: "1", l: "Accountable supplier" }],
  },

  specs: {
    index: "05", kicker: "Technical", title: "Specifications", sub: "Built to standard",
    statement: "Every transformer, panel and substation we supply is engineered to international standards and independently type-tested — so what you specify is exactly what arrives on site.",
    figures: [{ k: "DEKRA", l: "type-tested" }, { k: "ABB", l: "licensee" }, { k: "ISO", l: "9001" }],
    tables: [
      { group: "Transformers", rows: [["Voltage class", "up to 230 kV"], ["Capacity", "up to 150 MVA"], ["Type", "oil-immersed / cast-resin"], ["Standard", "IEC 60076 · DEKRA / KERI"]] },
      { group: "Switchgear", rows: [["Voltage", "up to 40.5 kV"], ["Short-circuit", "31.5 kA"], ["Technology", "ABB-licensed"], ["Classification", "internal-arc"]] },
      { group: "Delivery & support", rows: [["Engagement", "supply or turnkey"], ["Commissioning", "field + oil processing"], ["Documentation", "full test & compliance"], ["Support", "24 / 7 nationwide"]] },
    ],
  },

  projects: {
    index: "06", kicker: "Track record", title: "Delivered across the national grid",
    sub: "Transmission and distribution installations supplied, tested and energized by our team.",
    items: [
      { name: "Shwe Sar Yan Substation", location: "Mandalay Region", rating: "150 MVA", voltage: "230 / 33 / 11 kV", status: "Energized", img: "/photos/power-transformer.jpg" },
      { name: "Chauk Substation", location: "Magway Region", rating: "100 MVA", voltage: "132 / 66 / 11 kV", status: "Energized", img: "/photos/factory.jpg" },
      { name: "Mandalay Substation", location: "Mandalay", rating: "100 MVA", voltage: "132 / 33 / 11 kV", status: "Energized", img: "/photos/factory-2.jpg" },
    ],
  },

  md: {
    index: "07", kicker: "Leadership", title: "A message from our Managing Director",
    name: "Khin Maung Myat", role: "Managing Director", photo: "/team/kmm.png",
    paragraphs: [
      "Over the past decade we have grown from a regional workshop into a premier manufacturer of high-voltage power transformers and ABB-licensed switchgear — supplying the substations that carry electricity from generation to community.",
      "Our purpose is simple: to be the key to smart power. Every transformer that leaves our Yangon facility, from a compact distribution unit to a 230 kV / 150 MVA transmission machine, is engineered to the same international standards that govern the world's leading energy companies, and independently type-tested by DEKRA, KERI and Tecnalia.",
      "We believe local manufacturing should never mean local compromise. By combining licensed technology, rigorous in-house testing and a team of dedicated engineers, we deliver equipment that utilities, industries and partners can rely on for decades of continuous service.",
    ],
  },

  capabilities: { index: "02", kicker: "What we do", title: "Capabilities", sub: "Select a discipline", items: [
    { no: "01", title: "Product Trading", tag: "SUPPLY", desc: "Procurement-ready supply of transformers, switchgear, panels, cables and protection.", points: ["Direct, licensed supply lines", "Documented & warranted", "Quotation to delivery"], metric: { k: "5", l: "Product families" } },
    { no: "02", title: "EPC Turnkey", tag: "ENGINEER · BUILD", desc: "One accountable partner from requirement review to commissioning.", points: ["System design", "Site coordination", "Commissioning"], metric: { k: "E→C", l: "End to end" } },
    { no: "03", title: "Substations", tag: "GRID", desc: "Equipment supply and engineering for utility networks and distribution upgrades.", points: ["Package & conventional", "Protection & control", "Network upgrades"], metric: { k: "230", l: "kV class" } },
    { no: "04", title: "After-Sales", tag: "SERVICE", desc: "Commissioning, oil processing and 24/7 maintenance.", points: ["On-site oil processing", "Condition monitoring", "24/7 response"], metric: { k: "24/7", l: "Support" } },
  ] },
  process: { index: "06", kicker: "How we work", title: "From brief to power", sub: "Five stages · one partner", steps: [
    { no: "01", title: "Consult", desc: "We review your requirement, load profile and site — and translate it into a clear electrical scope." },
    { no: "02", title: "Engineer", desc: "Our engineers design the system — ratings, protection, single-line diagrams and equipment selection." },
    { no: "03", title: "Manufacture", desc: "Transformers and panels are built and type-tested in our Yangon facility." },
    { no: "04", title: "Deliver", desc: "Equipment is delivered, installation supervised and the system commissioned on site." },
    { no: "05", title: "Support", desc: "Handover, documentation and 24/7 after-sales support nationwide." },
  ] },
  industries: { index: "07", kicker: "Where we work", title: "Industries served", sub: "Power that can't fail", items: [
    { name: "Utility Substations", note: "Grid & transmission" }, { name: "Industrial Factories", note: "Process & manufacturing" },
    { name: "Commercial Buildings", note: "Towers & complexes" }, { name: "Energy Infrastructure", note: "Generation & renewables" },
    { name: "Distribution Networks", note: "Upgrades & extensions" }, { name: "Infrastructure", note: "Civil & development" },
  ] },
  standards: { index: "08", kicker: "Credentials", title: "Independently tested. Globally compliant.", sub: "Witnessed by accredited labs", certs: [
    { code: "DEKRA", title: "Type Test Certificate", note: "Netherlands · transmission class" },
    { code: "KERI", title: "Performance Validation", note: "Korea · transformer testing" },
    { code: "ABB", title: "Switchgear Licensee", note: "Licensed MV/LV technology" },
    { code: "ISO", title: "ISO 9001", note: "Quality management system" },
  ], standards: ["IEC 60076 — Power Transformers", "IEC 62271 — HV Switchgear", "IEC 61439 — LV Assemblies", "DEKRA / KERI / Tecnalia type tests"] },
  faq: { index: "09", kicker: "Questions", title: "Frequently asked", sub: "Straight answers", items: [
    { q: "What do you manufacture?", a: "Power and distribution transformers up to 230 kV / 150 MVA, and ABB-licensed medium- and low-voltage switchgear, panels and ring main units — built and tested at our Yangon facility." },
    { q: "Are your products independently tested?", a: "Yes. Our equipment is type-tested and validated by accredited third-party laboratories including DEKRA, KERI and Tecnalia, and built under an ABB license agreement and ISO 9001 quality system." },
    { q: "Do you handle installation and commissioning?", a: "We offer supply-only or full turnkey delivery — including field commissioning, oil filtration, condition monitoring and a 24/7 emergency maintenance desk with nationwide coverage." },
    { q: "How do I get a quotation?", a: "Send us your requirement — load, voltage, site and scope. We'll review it and return a clear, itemized quotation." },
  ] },

  cta: { index: "08", kicker: "Get in touch", title: "The key to", redWord: "smart power.",
    body: "Tell us what you're building — load, voltage, site and scope. We'll bring the equipment, the engineering and the after-sales support.",
    ctas: [{ label: "Request a Quote", href: "/#contact" }, { label: "View specifications", href: "/specifications" }],
    stats: [{ k: "230 kV", l: "Max voltage" }, { k: "150 MVA", l: "Peak capacity" }, { k: "DEKRA", l: "Type-tested" }, { k: "24/7", l: "Support" }] },

  footer: { blurb: "High-voltage power transformers and ABB-licensed switchgear, manufactured and supported in Yangon.",
    columns: [
      { title: "Products", links: [{ label: "Power Transformers", href: "/#products" }, { label: "Panels & Switchgear", href: "/#products" }, { label: "After-Sales", href: "/#products" }, { label: "Specifications", href: "/specifications" }] },
      { title: "Evidence", links: [{ label: "Projects", href: "/#projects" }, { label: "Certifications", href: "/#certs" }, { label: "MD Message", href: "/#md" }, { label: "FAQ", href: "/faq" }] },
      { title: "Company", links: [{ label: "Industries", href: "/industries" }, { label: "Process", href: "/process" }, { label: "Contact", href: "/#contact" }] },
    ],
    copyright: "© 2026 Power Moves · Asia General Holding", location: "Yangon · Myanmar" },
};
