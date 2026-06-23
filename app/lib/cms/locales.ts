import { cookies } from "next/headers";
import type { SiteContent } from "./schema";

export const LOCALES = ["en", "zh", "my"] as const;
export type Locale = (typeof LOCALES)[number];
export const LOCALE_COOKIE = "pm_locale";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  my: "မြန်မာ",
};
export const htmlLang: Record<Locale, string> = { en: "en", zh: "zh-Hans", my: "my" };

export async function getLocale(): Promise<Locale> {
  try {
    const c = await cookies();
    const v = c.get(LOCALE_COOKIE)?.value as Locale | undefined;
    return v && (LOCALES as readonly string[]).includes(v) ? v : "en";
  } catch {
    return "en";
  }
}

/* deep-merge a partial locale override over the English base.
   Plain objects merge recursively; arrays / primitives replace. */
type AnyRec = Record<string, unknown>;
function isObj(v: unknown): v is AnyRec {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
export function deepMerge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base) && Array.isArray(over)) {
    // element-wise: a partial override keeps untranslated fields from the base
    const merged = base.map((el, i) => (i < over.length ? deepMerge(el, over[i]) : el));
    if (over.length > base.length) merged.push(...over.slice(base.length));
    return merged as unknown as T;
  }
  if (!isObj(base) || !isObj(over)) return over as T;
  const out: AnyRec = { ...base };
  for (const k of Object.keys(over)) {
    out[k] = deepMerge((base as AnyRec)[k], over[k]);
  }
  return out as T;
}

/* ─────────────── Translations (deep-merged over English) ───────────────
   Anything omitted falls back to English, so the site is never half-empty.
   zh = Simplified Chinese. my = Burmese (machine-assisted draft — should be
   reviewed by a native speaker; editable per-locale once wired to the CMS). */

const zh: DeepPartial<SiteContent> = {
  brand: { eyebrow: "变压器 · ABB 授权开关柜" },
  nav: {
    groups: [
      { label: "关于我们", items: [
        { label: "概览", href: "/about", desc: "智慧电力的关键" },
        { label: "总经理寄语", href: "/about#md", desc: "来自我们的总经理" },
        { label: "公司治理", href: "/about#governance", desc: "我们的运营方式" },
        { label: "地址与位置", href: "/contact", desc: "联系与到访" },
      ] },
      { label: "产品", items: [
        { label: "电力变压器", href: "/products#transformer", desc: "高达 230 kV / 150 MVA" },
        { label: "配电柜与开关柜", href: "/products#panel", desc: "ABB 授权，高达 40.5 kV" },
        { label: "元器件", href: "/products#ancillary", desc: "辅助设备" },
        { label: "全部产品", href: "/products", desc: "完整目录" },
      ] },
    ],
    flat: [
      { label: "下载", href: "/downloads", desc: "" },
      { label: "新闻", href: "/news", desc: "" },
      { label: "支持", href: "/support", desc: "" },
      { label: "招聘", href: "/careers", desc: "" },
    ],
    cta: { label: "获取报价", href: "/contact" },
  },
  hero: {
    eyebrow: "高压变压器 · ABB 授权开关柜",
    titleLines: ["驱动行业", "向前发展。"],
    redWord: "向前发展。",
    sub: "电力变压器高达 230 kV / 150 MVA，以及 ABB 授权开关柜 —— 在仰光工厂按国际标准制造、型式试验并提供支持。",
    ctas: [{ label: "获取报价", href: "/contact" }, { label: "查看能力", href: "/#capabilities" }],
    keyspecs: [
      { l: "最高电压" }, { l: "峰值容量" }, { l: "开关柜等级" }, { l: "型式试验" },
    ],
  },
  marquee: ["ABB 授权开关柜", "DEKRA 型式试验", "KERI 验证", "Tecnalia 认证", "ISO 9001", "变压器高达 230 kV / 150 MVA", "开关柜高达 40.5 kV · 31.5 kA", "7×24 售后服务"],
  capabilities: {
    kicker: "我们的业务", title: "核心能力", sub: "选择一个领域",
    items: [
      { title: "变压器", tag: "制造", desc: "从紧凑型配电单元到 230 kV / 150 MVA 输电级，均在仰光工厂制造并完成型式试验。", points: ["高达 230 kV / 150 MVA", "油浸式与浇注式", "DEKRA / KERI 型式试验", "符合 IEC 60076"], metric: { k: "230", l: "kV 等级" } },
      { title: "配电柜与开关柜", tag: "ABB 授权", desc: "ABB 授权的中低压开关柜、环网柜与保护屏 —— 按标准装配与测试。", points: ["ABB 授权协议", "高达 40.5 kV · 31.5 kA", "内部电弧分级", "中压与低压成套设备"], metric: { k: "40.5", l: "kV 开关柜" } },
      { title: "EPC 与变电站", tag: "工程 · 建设", desc: "从需求评审到带电投运的单一责任伙伴 —— 为电网与配电网络提供工程、供货与施工。", points: ["系统设计与协调", "成套及常规变电站", "保护与控制", "单一责任主体"], metric: { k: "E→C", l: "全流程" } },
      { title: "售后服务", tag: "服务", desc: "现场调试、滤油、状态监测，以及全国覆盖的 7×24 紧急维护。", points: ["现场油处理", "状态监测", "全国覆盖", "7×24 响应"], metric: { k: "24/7", l: "支持" } },
    ],
  },
  epc: {
    kicker: "结构剖析", title: "走进电力屏柜", intro: "我们建造的每一台成套设备都作为一个完整、经型式试验的整体进行工程设计。",
    stats: [{ l: "集成层" }, { l: "开关柜等级" }, { l: "故障电流" }, { l: "单一供应商" }],
  },
  specs: {
    kicker: "技术参数", title: "规格", sub: "按标准制造",
    statement: "我们供应的每一台变压器、屏柜和变电站都按国际标准工程设计并经独立型式试验 —— 您所规定的，正是现场所交付的。",
    figures: [{ l: "型式试验" }, { l: "授权方" }, { l: "9001" }],
  },
  products: {
    kicker: "产品系列", title: "数据表浏览器", sub: "点选产品 · 查看规格",
  },
  process: {
    kicker: "工作流程", title: "从需求到电力", sub: "五个阶段 · 一个伙伴",
    steps: [
      { no: "01", title: "咨询", desc: "我们评审您的需求、负荷特性与现场，并转化为可签署的清晰电气范围。" },
      { no: "02", title: "工程设计", desc: "工程师完成系统设计 —— 参数、保护、单线图与设备选型，均按标准执行。" },
      { no: "03", title: "制造", desc: "变压器与 ABB 授权屏柜在仰光工厂制造并完成型式试验。" },
      { no: "04", title: "交付", desc: "设备运抵现场，安装受监督，系统在现场调试并测试。" },
      { no: "05", title: "支持", desc: "交接、文档与 7×24 全国售后支持。" },
    ],
  },
  industries: {
    kicker: "应用领域", title: "服务行业", sub: "电力，不容失效",
    items: [
      { name: "公用变电站", note: "输电与配电" }, { name: "工业工厂", note: "工艺与制造" },
      { name: "商业楼宇", note: "塔楼与综合体" }, { name: "能源基础设施", note: "发电与可再生" },
      { name: "配电网络", note: "升级与扩建" }, { name: "基础设施", note: "土建与开发" },
    ],
  },
  standards: {
    kicker: "资质", title: "独立检测，全球合规。", sub: "由权威实验室见证",
    standards: ["IEC 60076 — 电力变压器", "IEC 62271 — 高压开关设备", "IEC 61439 — 低压成套设备", "DEKRA / KERI / Tecnalia 型式试验"],
  },
  faq: {
    kicker: "常见问题", title: "常见问答", sub: "直接的答案",
    items: [
      { q: "Power Moves 制造什么？", a: "高达 230 kV / 150 MVA 的电力与配电变压器，以及 ABB 授权的中低压开关柜、屏柜与环网柜 —— 均在仰光工厂制造与测试。" },
      { q: "你们的产品经过独立检测吗？", a: "是的。我们的设备由 DEKRA、KERI 与 Tecnalia 等权威第三方实验室进行型式试验与验证，并依据 ABB 授权协议及 ISO 9001 质量体系制造。" },
      { q: "可处理的电压与故障等级是多少？", a: "变压器可达 230 kV / 150 MVA 输电级，开关柜可达 40.5 kV、31.5 kA 短路电流，并具内部电弧分级。" },
      { q: "你们负责安装与调试吗？", a: "我们提供仅供货或全交钥匙交付 —— 包括现场调试、滤油、状态监测，以及全国覆盖的 7×24 紧急维护。" },
      { q: "如何获取报价？", a: "请提供您的需求 —— 负荷、电压、现场与范围。我们将评审并返回清晰、逐项的报价。" },
    ],
  },
  cta: {
    kicker: "Power Moves 的承诺", title: "每一份报价背后，", redWord: "都是制造实力。",
    body: "高达 230 kV / 150 MVA 的变压器与 ABB 授权开关柜，经 DEKRA 与 KERI 型式试验 —— 辅以扎实的工程能力，我们报的，正是我们交付的。",
    ctas: [{ label: "启动您的项目", href: "/contact" }, { label: "查看规格", href: "/downloads" }],
    stats: [{ l: "最高电压" }, { l: "峰值容量" }, { l: "型式试验" }, { l: "支持" }],
  },
  footer: {
    blurb: "高压电力变压器与 ABB 授权开关柜，在仰光制造并提供支持。",
    columns: [
      { title: "产品", links: [{ label: "电力变压器", href: "/products#transformer" }, { label: "配电柜与开关柜", href: "/products#panel" }, { label: "元器件", href: "/products#ancillary" }, { label: "下载", href: "/downloads" }] },
      { title: "公司", links: [{ label: "关于我们", href: "/about" }, { label: "新闻", href: "/news" }, { label: "招聘", href: "/careers" }, { label: "支持", href: "/support" }] },
      { title: "联系", links: [{ label: "联系我们", href: "/contact" }, { label: "获取报价", href: "/contact" }, { label: "到访展厅", href: "/contact" }, { label: "规格", href: "/downloads" }] },
    ],
    copyright: "© 2026 Power Moves · Asia General Holding",
    location: "仰光 · 缅甸",
  },
};

const my: DeepPartial<SiteContent> = {
  brand: { eyebrow: "ထရန်စဖော်မာ · ABB လိုင်စင် Switchgear" },
  nav: {
    groups: [
      { label: "ကုမ္ပဏီ", items: [
        { label: "ခြုံငုံသုံးသပ်ချက်", href: "/about", desc: "စမတ်စွမ်းအင်၏ သော့ချက်" },
        { label: "MD ၏ စကား", href: "/about#md", desc: "မန်နေးဂျင်းဒါရိုက်တာထံမှ" },
        { label: "ကော်ပိုရိတ် စီမံအုပ်ချုပ်မှု", href: "/about#governance", desc: "ကျွန်ုပ်တို့ လုပ်ဆောင်ပုံ" },
        { label: "လိပ်စာနှင့် တည်နေရာ", href: "/contact", desc: "ဆက်သွယ်ရန်" },
      ] },
      { label: "ထုတ်ကုန်များ", items: [
        { label: "ပါဝါ ထရန်စဖော်မာ", href: "/products#transformer", desc: "230 kV / 150 MVA အထိ" },
        { label: "Panel နှင့် Switchgear", href: "/products#panel", desc: "ABB လိုင်စင်၊ 40.5 kV အထိ" },
        { label: "အစိတ်အပိုင်းများ", href: "/products#ancillary", desc: "ဆက်စပ်ပစ္စည်းများ" },
        { label: "ထုတ်ကုန်အားလုံး", href: "/products", desc: "စာရင်းအပြည့်အစုံ" },
      ] },
    ],
    flat: [
      { label: "ဒေါင်းလုဒ်", href: "/downloads", desc: "" },
      { label: "သတင်း", href: "/news", desc: "" },
      { label: "ပံ့ပိုးမှု", href: "/support", desc: "" },
      { label: "အလုပ်အကိုင်", href: "/careers", desc: "" },
    ],
    cta: { label: "စျေးနှုန်းတောင်းရန်", href: "/contact" },
  },
  hero: {
    eyebrow: "မြင့်မားသော ဗို့အား ထရန်စဖော်မာ · ABB လိုင်စင် Switchgear",
    titleLines: ["စက်မှုလုပ်ငန်းကို", "ရှေ့သို့တွန်းအား။"],
    redWord: "ရှေ့သို့တွန်းအား။",
    sub: "ပါဝါ ထရန်စဖော်မာ 230 kV / 150 MVA အထိနှင့် ABB လိုင်စင် switchgear —— ရန်ကုန်စက်ရုံတွင် နိုင်ငံတကာစံချိန်စံညွှန်းဖြင့် ထုတ်လုပ်၊ စမ်းသပ်၊ ပံ့ပိုးထားသည်။",
    ctas: [{ label: "စျေးနှုန်းတောင်းရန်", href: "/contact" }, { label: "စွမ်းဆောင်ရည်များ ကြည့်ရန်", href: "/#capabilities" }],
    keyspecs: [{ l: "အမြင့်ဆုံးဗို့အား" }, { l: "အမြင့်ဆုံးပမာဏ" }, { l: "Switchgear အဆင့်" }, { l: "Type-tested" }],
  },
  marquee: ["ABB လိုင်စင် Switchgear", "DEKRA Type-Tested", "KERI အတည်ပြု", "Tecnalia အသိအမှတ်ပြု", "ISO 9001", "ထရန်စဖော်မာ 230 kV / 150 MVA အထိ", "Switchgear 40.5 kV · 31.5 kA အထိ", "24/7 ဝန်ဆောင်မှု"],
  capabilities: {
    kicker: "ကျွန်ုပ်တို့ လုပ်ဆောင်သည်", title: "စွမ်းဆောင်ရည်များ", sub: "ကဏ္ဍတစ်ခု ရွေးပါ",
    items: [
      { title: "ထရန်စဖော်မာ", tag: "ထုတ်လုပ်မှု", desc: "သေးငယ်သော ဖြန့်ဖြူးယူနစ်မှ 230 kV / 150 MVA အထိ ရန်ကုန်စက်ရုံတွင် ထုတ်လုပ်၍ type-test ပြုလုပ်ထားသည်။", points: ["230 kV / 150 MVA အထိ", "ဆီစိမ် နှင့် cast-resin", "DEKRA / KERI type-tested", "IEC 60076 အတိုင်း"], metric: { k: "230", l: "kV အဆင့်" } },
      { title: "Panel နှင့် Switchgear", tag: "ABB လိုင်စင်", desc: "ABB လိုင်စင် အလယ်/နိမ့်ဗို့အား switchgear၊ ring main unit နှင့် protection panel များ။", points: ["ABB လိုင်စင်သဘောတူညီချက်", "40.5 kV · 31.5 kA အထိ", "Internal-arc အဆင့်", "MV နှင့် LV assembly"], metric: { k: "40.5", l: "kV switchgear" } },
      { title: "EPC နှင့် Substation", tag: "အင်ဂျင်နီယာ · တည်ဆောက်", desc: "လိုအပ်ချက်သုံးသပ်ခြင်းမှ စွမ်းအင်ဖြည့်သွင်းခြင်းအထိ တာဝန်ခံ မိတ်ဖက်တစ်ဦးတည်း။", points: ["စနစ်ဒီဇိုင်း", "Substation များ", "Protection နှင့် control", "တာဝန်ခံတစ်ဦးတည်း"], metric: { k: "E→C", l: "အစအဆုံး" } },
      { title: "ရောင်းပြီးဝန်ဆောင်မှု", tag: "ဝန်ဆောင်မှု", desc: "ကွင်းဆင်း commissioning၊ ဆီသန့်စင်ခြင်း၊ စောင့်ကြည့်ခြင်းနှင့် 24/7 အရေးပေါ် ပြုပြင်ထိန်းသိမ်းမှု။", points: ["ကွင်းဆင်း ဆီသန့်စင်", "အခြေအနေ စောင့်ကြည့်", "တစ်နိုင်ငံလုံး", "24/7 တုံ့ပြန်မှု"], metric: { k: "24/7", l: "ပံ့ပိုးမှု" } },
    ],
  },
  epc: {
    kicker: "ဖွဲ့စည်းပုံ", title: "EPC Panel အတွင်းပိုင်း", intro: "ကျွန်ုပ်တို့ တည်ဆောက်သော assembly တိုင်းကို ပြည့်စုံ၍ type-tested ယူနစ်အဖြစ် ဒီဇိုင်းဆွဲထားသည်။",
    stats: [{ l: "အလွှာများ" }, { l: "Switchgear အဆင့်" }, { l: "Fault rating" }, { l: "တာဝန်ခံ" }],
  },
  specs: {
    kicker: "နည်းပညာ", title: "အသေးစိတ်စံချိန်များ", sub: "စံအတိုင်း ထုတ်လုပ်",
    statement: "ကျွန်ုပ်တို့ပေးသွင်းသော ထရန်စဖော်မာ၊ panel နှင့် substation တိုင်းကို နိုင်ငံတကာစံဖြင့် ဒီဇိုင်းဆွဲ၍ သီးခြား type-test ပြုလုပ်ထားသည်။",
    figures: [{ l: "type-tested" }, { l: "licensee" }, { l: "9001" }],
  },
  products: { kicker: "ထုတ်ကုန်များ", title: "Datasheet ရှာဖွေချက်", sub: "ထုတ်ကုန်တစ်ခု နှိပ်ပါ" },
  process: {
    kicker: "လုပ်ဆောင်ပုံ", title: "လိုအပ်ချက်မှ စွမ်းအင်အထိ", sub: "အဆင့် ၅ ဆင့် · မိတ်ဖက်တစ်ဦး",
    steps: [
      { no: "01", title: "တိုင်ပင်", desc: "သင့်လိုအပ်ချက်၊ load နှင့် နေရာကို သုံးသပ်၍ ရှင်းလင်းသော လျှပ်စစ်အကျယ်အဝန်းအဖြစ် ပြောင်းလဲပေးသည်။" },
      { no: "02", title: "အင်ဂျင်နီယာ", desc: "အင်ဂျင်နီယာများက စနစ်ကို ဒီဇိုင်းဆွဲသည် —— rating၊ protection၊ single-line diagram နှင့် ပစ္စည်းရွေးချယ်မှု။" },
      { no: "03", title: "ထုတ်လုပ်", desc: "ထရန်စဖော်မာနှင့် ABB လိုင်စင် panel များကို ရန်ကုန်စက်ရုံတွင် ထုတ်လုပ်၍ type-test ပြုလုပ်သည်။" },
      { no: "04", title: "ပေးပို့", desc: "ပစ္စည်းများ ပေးပို့၊ တပ်ဆင်မှု ကြီးကြပ်၍ စနစ်ကို နေရာတွင် commission ပြုလုပ်သည်။" },
      { no: "05", title: "ပံ့ပိုး", desc: "လွှဲပြောင်းခြင်း၊ စာရွက်စာတမ်းနှင့် 24/7 ရောင်းပြီးဝန်ဆောင်မှု။" },
    ],
  },
  industries: {
    kicker: "ဝန်ဆောင်သည့်နေရာ", title: "ဝန်ဆောင်သည့် လုပ်ငန်းများ", sub: "မပျက်ရသော စွမ်းအင်",
    items: [
      { name: "Utility Substation", note: "ဓာတ်အားလိုင်း" }, { name: "စက်မှုစက်ရုံ", note: "ထုတ်လုပ်မှု" },
      { name: "စီးပွားရေးအဆောက်အဦ", note: "မြင့်မားသောအဆောက်အဦ" }, { name: "စွမ်းအင်အခြေခံအဆောက်အအုံ", note: "ထုတ်လုပ်ခြင်း" },
      { name: "ဖြန့်ဖြူးကွန်ရက်", note: "အဆင့်မြှင့်တင်ခြင်း" }, { name: "အခြေခံအဆောက်အအုံ", note: "ဆောက်လုပ်ရေး" },
    ],
  },
  standards: {
    kicker: "အရည်အချင်း", title: "သီးခြားစစ်ဆေး၊ ကမ္ဘာ့စံကိုက်။", sub: "အသိအမှတ်ပြု ဓာတ်ခွဲခန်းများက",
    standards: ["IEC 60076 — Power Transformers", "IEC 62271 — HV Switchgear", "IEC 61439 — LV Assemblies", "DEKRA / KERI / Tecnalia type tests"],
  },
  faq: {
    kicker: "မေးခွန်းများ", title: "မေးလေ့ရှိသော မေးခွန်းများ", sub: "တိုက်ရိုက်အဖြေများ",
    items: [
      { q: "Power Moves က ဘာထုတ်လုပ်သလဲ?", a: "230 kV / 150 MVA အထိ ပါဝါနှင့် ဖြန့်ဖြူး ထရန်စဖော်မာများ၊ ABB လိုင်စင် MV/LV switchgear၊ panel နှင့် ring main unit များ —— ရန်ကုန်စက်ရုံတွင် ထုတ်လုပ်၊ စမ်းသပ်သည်။" },
      { q: "ထုတ်ကုန်များ သီးခြားစစ်ဆေးပြီးလား?", a: "ဟုတ်ကဲ့။ DEKRA၊ KERI နှင့် Tecnalia ကဲ့သို့ အသိအမှတ်ပြု တတိယအဖွဲ့ ဓာတ်ခွဲခန်းများက type-test ပြုလုပ်ပြီး ABB လိုင်စင်နှင့် ISO 9001 အရည်အသွေးစနစ်ဖြင့် ထုတ်လုပ်သည်။" },
      { q: "ဗို့အားနှင့် fault အဆင့် ဘယ်လောက်အထိလဲ?", a: "ထရန်စဖော်မာ 230 kV / 150 MVA အထိ၊ switchgear 40.5 kV၊ 31.5 kA short-circuit အထိ၊ internal-arc အဆင့်ဖြင့်။" },
      { q: "တပ်ဆင်ခြင်းနှင့် commissioning လုပ်ပေးသလား?", a: "supply-only သို့မဟုတ် turnkey အပြည့် ပေးပို့မှု —— ကွင်းဆင်း commissioning၊ ဆီသန့်စင်ခြင်း၊ စောင့်ကြည့်ခြင်းနှင့် 24/7 အရေးပေါ်ဝန်ဆောင်မှု အပါအဝင်။" },
      { q: "စျေးနှုန်း ဘယ်လိုရနိုင်မလဲ?", a: "သင့်လိုအပ်ချက် —— load၊ ဗို့အား၊ နေရာနှင့် အကျယ်အဝန်းကို ပို့ပါ။ ရှင်းလင်းသော စျေးနှုန်းဖြင့် ပြန်လည်အကြောင်းကြားပါမည်။" },
    ],
  },
  cta: {
    kicker: "Power Moves ၏ ကတိ", title: "စျေးနှုန်းတိုင်းနောက်ကွယ်တွင်", redWord: "ထုတ်လုပ်မှုစွမ်းအား။",
    body: "230 kV / 150 MVA အထိ ထရန်စဖော်မာနှင့် ABB လိုင်စင် switchgear၊ DEKRA နှင့် KERI type-tested —— ကျွန်ုပ်တို့ ပြောသည့်အတိုင်း ပေးပို့ပါသည်။",
    ctas: [{ label: "စီမံကိန်း စတင်ရန်", href: "/contact" }, { label: "စံချိန်များ ကြည့်ရန်", href: "/downloads" }],
    stats: [{ l: "အမြင့်ဆုံးဗို့အား" }, { l: "အမြင့်ဆုံးပမာဏ" }, { l: "Type-tested" }, { l: "ပံ့ပိုးမှု" }],
  },
  footer: {
    blurb: "မြင့်မားသောဗို့အား ပါဝါ ထရန်စဖော်မာနှင့် ABB လိုင်စင် switchgear၊ ရန်ကုန်တွင် ထုတ်လုပ်၊ ပံ့ပိုးသည်။",
    location: "ရန်ကုန် · မြန်မာ",
  },
};

type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

export const overrides: Record<Locale, DeepPartial<SiteContent>> = { en: {}, zh, my };
