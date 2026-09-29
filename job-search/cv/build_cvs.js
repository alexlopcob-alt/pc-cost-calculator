// Builds the three ATS-safe CVs from one data model.
// Run: node build_cvs.js   (outputs .docx into this folder)
// ATS rules applied: single column, no tables, no text boxes, no headers/footers,
// standard section names, Calibri 11, real bullet numbering, dates as "Mon YYYY".

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat,
  BorderStyle, TabStopType, TabStopPosition,
} = require("docx");

// ---------- shared facts (mirror MASTER_PROFILE.md) ----------
const F = {
  name: "Alex Cobos",
  email: "alex.lopcob@gmail.com",
  phone: "+34 690 660 128",
  linkedin: "linkedin.com/in/alex-cobos-50599618",
  cityEN: "Madrid, Spain",
  addressES: "Calle Antonio Pérez 9, 28002 Madrid",
};

const EN = {
  headline: {
    madrid: "Senior Customer Success Manager | Strategic Account Management | Enterprise SaaS",
    remote: "Senior Customer Success Manager | Strategic Accounts EMEA | Remote",
  },
  contact: (variant) => [
    `${F.cityEN} | ${F.email} | ${F.phone} | ${F.linkedin}`,
    variant === "remote"
      ? "Remote across EMEA (CET) | Right to work in the EU and UK, no sponsorship required | Available immediately"
      : "Madrid based, on-site or hybrid | Right to work in the EU and UK, no sponsorship required | Available immediately",
  ],
  sections: {
    summary: "PROFESSIONAL SUMMARY",
    competencies: "CORE COMPETENCIES",
    experience: "PROFESSIONAL EXPERIENCE",
    education: "EDUCATION",
    certs: "CERTIFICATIONS",
    languages: "LANGUAGES",
    tools: "TOOLS",
  },
  summary: (variant) =>
    `Senior Customer Success and Strategic Account leader with 15+ years in enterprise B2B, 8+ in SaaS. Owned a $11M+ ARR portfolio of 25+ strategic accounts at Coursera (Volkswagen Group, Novartis, HSBC, BBVA) with 90%+ renewal rates and 125% net revenue retention. Builds customer success functions, health scoring and renewal-risk systems from scratch, and now applies AI tooling to renewal forecasting. Bilingual Spanish and English, MBA from the London School of Economics, ${variant === "remote" ? "based in Madrid and experienced running distributed EMEA and LATAM portfolios remotely." : "based in Madrid."}`,
  competencies: [
    "Enterprise Customer Success and Strategic Account Management ($10M+ ARR portfolios)",
    "Renewals, Net Revenue Retention and Expansion Strategy",
    "Executive Business Reviews and C-Suite Stakeholder Management",
    "Customer Health Scoring, Churn Forecasting and Risk Mitigation",
    "Adoption Roadmaps, Change Management and Value Realisation",
    "CS Programme Design, Playbooks and Process Documentation",
    "Cross-Functional Leadership with Sales, Product and Support",
    "Team Mentoring, Enablement and Hiring Support",
    "Gainsight, Salesforce, HubSpot, Tableau, Power BI, Looker",
    "AI-assisted CS Workflows (Claude, Make) for Health Scoring and Renewal Forecasting",
  ],
  experience: [
    {
      company: "Independent Customer Success Consultant (fractional)",
      title: "Fractional Customer Success Lead",
      dates: "Jan 2026 – Present",
      loc: "Madrid, remote",
      bullets: [
        "Fractional and interim customer success engagements for B2B SaaS companies: renewal-risk reviews, health-score models, executive business review programmes and expansion planning.",
        "Designed onboarding and success playbooks that give founders and CS teams a repeatable path from signature to renewal.",
        "Built AI-assisted renewal forecasting and account-health tooling that turns usage and support data into weekly risk calls.",
      ],
    },
    {
      company: "Pressure Calibration",
      title: "Co-Founder and Commercial Lead",
      dates: "Feb 2025 – Present",
      loc: "Madrid",
      bullets: [
        "Co-founded a performance and wellbeing company helping commercial leaders and teams perform under pressure; built go-to-market, customer success framework and onboarding from zero.",
        "Opened early enterprise pipeline through direct engagement with CROs and VP Sales; runs cohort programmes in Madrid and the Nervous System Summit in Tallinn.",
      ],
    },
    {
      company: "Coursera",
      title: "Senior Customer Success Manager, Strategic Accounts",
      dates: "May 2021 – Feb 2025",
      loc: "London",
      bullets: [
        "Owned $11M+ ARR across 25+ strategic enterprise accounts including Volkswagen Group, Novartis, HSBC and BBVA; primary advisor to C-suite and VP stakeholders on adoption and transformation goals.",
        "Delivered 90%+ renewal rates and 125% net revenue retention through proactive risk mitigation, multi-quarter success planning and rigorous outcome tracking; prevented several six-figure churn events.",
        "Led executive business reviews with Fortune 500 stakeholders and built mutual success plans that produced hundreds of thousands of dollars in incremental ARR.",
        "Designed adoption roadmaps and change-management programmes for complex, multi-country deployments, reducing time to value and lifting engagement.",
        "Used Gainsight, Tableau and Power BI to surface adoption gaps and expansion signals; the resulting playbooks were adopted team-wide.",
        "Mentored customer success managers, wrote process documentation and supported hiring and onboarding; acted as voice of customer into the product roadmap.",
      ],
    },
    {
      company: "Wiley / CrossKnowledge",
      title: "Global Account Director",
      dates: "Sep 2018 – May 2021",
      loc: "London",
      bullets: [
        "Owned growth and retention of about 50 enterprise accounts (40 in the UK, 10 in Spain and Mexico) including HSBC and Barclays, sustaining 90%+ renewal rates on a multi-million-dollar digital learning SaaS book.",
        "Designed adoption frameworks and change-management programmes serving thousands of end users across HR and L&D platforms.",
        "Built trusted-advisor relationships with C-level sponsors and coordinated Sales, Services and Support to deliver strategic account plans.",
      ],
    },
    {
      company: "Learning Technologies Group (Eukleia Training)",
      title: "Solutions Consultant",
      dates: "Jun 2017 – Aug 2018",
      loc: "London",
      bullets: [
        "Grew and retained three key UK accounts and won new business; sold a £450,000 blended global compliance programme to a top-three investment bank.",
      ],
    },
    {
      company: "Euromoney Learning Solutions (Euromoney PLC)",
      title: "Senior Client Relationship Manager",
      dates: "Jun 2015 – Jun 2017",
      loc: "London",
      bullets: [
        "Secured customised training contracts with banks, governments and development finance institutions across Europe, Africa and LATAM; hit target two years running (£150k, then £550k) and opened four new markets.",
      ],
    },
    {
      company: "Financial Times | IE Corporate Learning Alliance",
      title: "Business Development and Account Management",
      dates: "Mar 2014 – Jul 2015",
      loc: "London",
      bullets: [
        "Consistent over-achievement against quota; launched a B2B gift-subscription initiative that signed 10 new corporate clients in its first three months.",
      ],
    },
    {
      company: "Euromonitor International",
      title: "Key Account Manager",
      dates: "Oct 2013 – Feb 2014",
      loc: "London",
      bullets: [
        "Managed renewal negotiations and SaaS usage growth with FMCG clients, including a €1.03M renewal with the largest retail account in the book.",
      ],
    },
    {
      company: "Earlier roles: B2B subscription and information sales (Springer, Informa)",
      title: "Account Management and Business Development",
      dates: "2009 – 2013",
      loc: "London and Madrid",
      bullets: [],
    },
  ],
  education: [
    "MBA, London School of Economics and Political Science, 2017 – 2018",
    "BA Advertising and Public Relations, ESIC Business and Marketing School, Madrid, 2004 – 2009",
  ],
  certs: [
    "AI/ML Applications, Anthropic and DeepLearning.AI, 2024",
    "Applied AI Workflows and Automation, 2024 – 2025",
    "Machine Learning for Business Professionals, Google Cloud, 2020",
    "Certified Professional in Learning and Performance (CPLP), 2019",
  ],
  languages: "Spanish (native), English (bilingual, 15+ years working in London), French (intermediate), Portuguese (basic)",
  tools: "Gainsight, Salesforce, HubSpot, Microsoft Dynamics, Tableau, Power BI, Looker, Claude and Claude Code, Make, Microsoft 365, Google Workspace",
};

const ES = {
  headline: {
    madrid: "Senior Customer Success Manager | Gestión de Cuentas Estratégicas | SaaS Enterprise",
  },
  contact: () => [
    `${F.addressES} | ${F.email} | ${F.phone} | ${F.linkedin}`,
    "Residente en Madrid, presencial o híbrido | Nacionalidad española, permiso de trabajo en la UE y Reino Unido | Incorporación inmediata",
  ],
  sections: {
    summary: "PERFIL PROFESIONAL",
    competencies: "COMPETENCIAS CLAVE",
    experience: "EXPERIENCIA PROFESIONAL",
    education: "FORMACIÓN",
    certs: "CERTIFICACIONES",
    languages: "IDIOMAS",
    tools: "HERRAMIENTAS",
  },
  summary: () =>
    "Líder senior de Customer Success y cuentas estratégicas con más de 15 años en B2B enterprise, 8 de ellos en SaaS. Responsable en Coursera de una cartera de más de 11 M$ de ARR con más de 25 cuentas estratégicas (Grupo Volkswagen, Novartis, HSBC, BBVA), con renovaciones superiores al 90 % y un NRR del 125 %. Construye funciones de Customer Success, modelos de health scoring y sistemas de riesgo de renovación desde cero, aplicando herramientas de IA a la previsión de renovaciones. Bilingüe español e inglés, MBA por la London School of Economics, residente en Madrid.",
  competencies: [
    "Customer Success enterprise y gestión de cuentas estratégicas (carteras de más de 10 M$ de ARR)",
    "Renovaciones, Net Revenue Retention y estrategia de expansión",
    "Executive Business Reviews y gestión de stakeholders de nivel C",
    "Health scoring, previsión de churn y mitigación de riesgos",
    "Planes de adopción, gestión del cambio y realización de valor",
    "Diseño de programas de CS, playbooks y documentación de procesos",
    "Liderazgo transversal con Ventas, Producto y Soporte",
    "Mentoría de equipos, enablement y apoyo en contratación",
    "Gainsight, Salesforce, HubSpot, Tableau, Power BI, Looker",
    "Flujos de CS asistidos por IA (Claude, Make) para health scoring y previsión de renovaciones",
  ],
  experience: [
    {
      company: "Consultor independiente de Customer Success (fractional)",
      title: "Fractional Customer Success Lead",
      dates: "Ene 2026 – Actualidad",
      loc: "Madrid, remoto",
      bullets: [
        "Proyectos fractional e interinos de Customer Success para empresas SaaS B2B: revisiones de riesgo de renovación, modelos de health score, programas de Executive Business Reviews y planes de expansión.",
        "Diseño de playbooks de onboarding y éxito que dan a fundadores y equipos de CS un camino repetible desde la firma hasta la renovación.",
        "Construcción de herramientas de previsión de renovaciones y salud de cuenta asistidas por IA que convierten datos de uso y soporte en decisiones semanales de riesgo.",
      ],
    },
    {
      company: "Pressure Calibration",
      title: "Cofundador y Responsable Comercial",
      dates: "Feb 2025 – Actualidad",
      loc: "Madrid",
      bullets: [
        "Cofundador de una empresa de rendimiento y bienestar que ayuda a líderes y equipos comerciales a rendir bajo presión; construcción del go-to-market, del marco de Customer Success y del onboarding desde cero.",
        "Apertura de pipeline enterprise mediante contacto directo con CROs y VP de Ventas; programas de cohortes en Madrid y el Nervous System Summit en Tallin.",
      ],
    },
    {
      company: "Coursera",
      title: "Senior Customer Success Manager, Cuentas Estratégicas",
      dates: "May 2021 – Feb 2025",
      loc: "Londres",
      bullets: [
        "Responsable de más de 11 M$ de ARR en más de 25 cuentas enterprise estratégicas, entre ellas Grupo Volkswagen, Novartis, HSBC y BBVA; asesor principal de stakeholders de nivel C y VP en objetivos de adopción y transformación.",
        "Renovaciones superiores al 90 % y NRR del 125 % mediante mitigación proactiva de riesgos, planificación plurianual de éxito y seguimiento riguroso de resultados; evitó varios casos de churn de seis cifras.",
        "Dirección de Executive Business Reviews con stakeholders Fortune 500 y planes de éxito conjuntos que generaron cientos de miles de dólares de ARR incremental.",
        "Diseño de planes de adopción y programas de gestión del cambio en despliegues complejos y multipaís, reduciendo el time to value y elevando el engagement.",
        "Uso de Gainsight, Tableau y Power BI para detectar brechas de adopción y señales de expansión; los playbooks resultantes se adoptaron en todo el equipo.",
        "Mentoría de CSMs, documentación de procesos y apoyo en contratación y onboarding; voz del cliente ante el roadmap de producto.",
      ],
    },
    {
      company: "Wiley / CrossKnowledge",
      title: "Global Account Director",
      dates: "Sep 2018 – May 2021",
      loc: "Londres",
      bullets: [
        "Crecimiento y retención de unas 50 cuentas enterprise (40 en Reino Unido, 10 en España y México), incluidas HSBC y Barclays, manteniendo renovaciones superiores al 90 % en una cartera SaaS de formación digital de varios millones de dólares.",
        "Diseño de marcos de adopción y programas de gestión del cambio para miles de usuarios en plataformas de RR. HH. y formación.",
        "Relaciones de asesor de confianza con patrocinadores de nivel C y coordinación de Ventas, Servicios y Soporte para ejecutar los planes de cuenta.",
      ],
    },
    {
      company: "Learning Technologies Group (Eukleia Training)",
      title: "Solutions Consultant",
      dates: "Jun 2017 – Ago 2018",
      loc: "Londres",
      bullets: [
        "Crecimiento y retención de tres cuentas clave en Reino Unido y captación de nuevo negocio; venta de un programa global de formación en cumplimiento por 450.000 £ a uno de los tres mayores bancos de inversión.",
      ],
    },
    {
      company: "Euromoney Learning Solutions (Euromoney PLC)",
      title: "Senior Client Relationship Manager",
      dates: "Jun 2015 – Jun 2017",
      loc: "Londres",
      bullets: [
        "Contratos de formación a medida con bancos, gobiernos e instituciones financieras de desarrollo en Europa, África y Latinoamérica; objetivos cumplidos dos años seguidos (150.000 £ y 550.000 £) y apertura de cuatro mercados nuevos.",
      ],
    },
    {
      company: "Financial Times | IE Corporate Learning Alliance",
      title: "Desarrollo de Negocio y Gestión de Cuentas",
      dates: "Mar 2014 – Jul 2015",
      loc: "Londres",
      bullets: [
        "Superación constante de la cuota; lanzamiento de una iniciativa B2B de suscripciones regalo que firmó 10 nuevos clientes corporativos en sus tres primeros meses.",
      ],
    },
    {
      company: "Euromonitor International",
      title: "Key Account Manager",
      dates: "Oct 2013 – Feb 2014",
      loc: "Londres",
      bullets: [
        "Negociación de renovaciones y crecimiento del uso de SaaS con clientes de gran consumo, incluida una renovación de 1,03 M€ con la mayor cuenta de retail de la cartera.",
      ],
    },
    {
      company: "Puestos anteriores: ventas B2B de suscripciones e información (Springer, Informa)",
      title: "Gestión de cuentas y desarrollo de negocio",
      dates: "2009 – 2013",
      loc: "Londres y Madrid",
      bullets: [],
    },
  ],
  education: [
    "MBA, London School of Economics and Political Science, 2017 – 2018",
    "Licenciatura en Publicidad y Relaciones Públicas, ESIC Business and Marketing School, Madrid, 2004 – 2009",
  ],
  certs: [
    "AI/ML Applications, Anthropic y DeepLearning.AI, 2024",
    "Applied AI Workflows and Automation, 2024 – 2025",
    "Machine Learning for Business Professionals, Google Cloud, 2020",
    "Certified Professional in Learning and Performance (CPLP), 2019",
  ],
  languages: "Español (nativo), inglés (bilingüe, más de 15 años trabajando en Londres), francés (intermedio), portugués (básico)",
  tools: "Gainsight, Salesforce, HubSpot, Microsoft Dynamics, Tableau, Power BI, Looker, Claude y Claude Code, Make, Microsoft 365, Google Workspace",
};

// ---------- docx helpers ----------
const FONT = "Calibri";
const t = (text, opts = {}) => new TextRun({ text, font: FONT, size: 21, ...opts });

const heading = (text) =>
  new Paragraph({
    spacing: { before: 220, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "444444", space: 1 } },
    children: [t(text, { bold: true, size: 23, color: "222222" })],
  });

const para = (text, opts = {}) =>
  new Paragraph({ spacing: { after: 80 }, children: [t(text, opts)] });

const bullet = (text) =>
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 40 }, children: [t(text)] });

const roleHeader = (r) => [
  new Paragraph({
    spacing: { before: 120, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [t(r.company, { bold: true }), t("\t" + r.dates, { bold: true })],
  }),
  new Paragraph({
    spacing: { after: 40 },
    children: [t(r.title, { italics: true }), t(" | " + r.loc, { color: "555555" })],
  }),
];

function build(lang, variant, outName) {
  const D = lang === "es" ? ES : EN;
  const s = D.sections;
  const children = [];

  children.push(new Paragraph({ spacing: { after: 20 }, children: [t(F.name.toUpperCase(), { bold: true, size: 34 })] }));
  children.push(new Paragraph({ spacing: { after: 40 }, children: [t(D.headline[variant] || D.headline.madrid, { bold: true, size: 23, color: "333333" })] }));
  for (const line of D.contact(variant)) children.push(para(line, { size: 20, color: "444444" }));

  children.push(heading(s.summary));
  children.push(para(D.summary(variant)));

  children.push(heading(s.competencies));
  for (const c of D.competencies) children.push(bullet(c));

  children.push(heading(s.experience));
  for (const r of D.experience) {
    children.push(...roleHeader(r));
    for (const b of r.bullets) children.push(bullet(b));
  }

  children.push(heading(s.education));
  for (const e of D.education) children.push(bullet(e));

  children.push(heading(s.certs));
  for (const c of D.certs) children.push(bullet(c));

  children.push(heading(s.languages));
  children.push(para(D.languages));


  const doc = new Document({
    creator: F.name,
    title: `${F.name} CV`,
    styles: { default: { document: { run: { font: FONT, size: 21 } } } },
    numbering: {
      config: [{
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 240 } } } }],
      }],
    },
    sections: [{
      properties: { page: { margin: { top: 800, bottom: 800, left: 900, right: 900 } } },
      children,
    }],
  });

  return Packer.toBuffer(doc).then((buf) => {
    fs.writeFileSync(path.join(__dirname, outName), buf);
    console.log("wrote", outName);
  });
}

// ---------- HTML twin (same data) for PDF printing via headless Chromium ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function buildHtml(lang, variant, outName) {
  const D = lang === "es" ? ES : EN;
  const s = D.sections;
  const h = [];
  h.push(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(F.name)} CV</title><style>
  @page { size: A4; margin: 14mm 16mm; }
  body { font-family: Calibri, Carlito, "Liberation Sans", Arial, sans-serif; font-size: 10pt; color: #111; line-height: 1.28; margin: 0; }
  h1 { font-size: 17pt; margin: 0 0 2pt; letter-spacing: .5px; }
  .headline { font-weight: bold; font-size: 11pt; color: #333; margin: 0 0 3pt; }
  .contact { font-size: 9.5pt; color: #444; margin: 0 0 2pt; }
  h2 { font-size: 11pt; margin: 11pt 0 3pt; padding-bottom: 1pt; border-bottom: 1px solid #444; }
  ul { margin: 0 0 3pt 14pt; padding: 0; } li { margin: 0 0 2pt; }
  .role { display: flex; justify-content: space-between; font-weight: bold; margin-top: 6pt; }
  .sub { font-style: italic; margin-bottom: 2pt; } .sub span { font-style: normal; color: #555; }
  p { margin: 0 0 4pt; }
  </style></head><body>`);
  h.push(`<h1>${esc(F.name.toUpperCase())}</h1><p class="headline">${esc(D.headline[variant] || D.headline.madrid)}</p>`);
  for (const line of D.contact(variant)) h.push(`<p class="contact">${esc(line)}</p>`);
  h.push(`<h2>${esc(s.summary)}</h2><p>${esc(D.summary(variant))}</p>`);
  h.push(`<h2>${esc(s.competencies)}</h2><ul>${D.competencies.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`);
  h.push(`<h2>${esc(s.experience)}</h2>`);
  for (const r of D.experience) {
    h.push(`<div class="role"><span>${esc(r.company)}</span><span>${esc(r.dates)}</span></div>`);
    h.push(`<div class="sub">${esc(r.title)} <span>| ${esc(r.loc)}</span></div>`);
    if (r.bullets.length) h.push(`<ul>${r.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`);
  }
  h.push(`<h2>${esc(s.education)}</h2><ul>${D.education.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>`);
  h.push(`<h2>${esc(s.certs)}</h2><ul>${D.certs.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`);
  h.push(`<h2>${esc(s.languages)}</h2><p>${esc(D.languages)}</p>`);
  h.push(`</body></html>`);
  const dir = process.env.HTML_OUT || __dirname;
  fs.writeFileSync(path.join(dir, outName), h.join("\n"));
  console.log("wrote", outName);
}

Promise.all([
  build("en", "madrid", "Alex_Cobos_CV_EN_Madrid.docx"),
  build("en", "remote", "Alex_Cobos_CV_EN_Remote_EMEA.docx"),
  build("es", "madrid", "Alex_Cobos_CV_ES_Madrid.docx"),
]).then(() => {
  buildHtml("en", "madrid", "Alex_Cobos_CV_EN_Madrid.html");
  buildHtml("en", "remote", "Alex_Cobos_CV_EN_Remote_EMEA.html");
  buildHtml("es", "madrid", "Alex_Cobos_CV_ES_Madrid.html");
}).catch((e) => { console.error(e); process.exit(1); });
