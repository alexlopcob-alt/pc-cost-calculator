const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, LevelFormat, ShadingType, TabStopType,
} = require('docx');
const fs = require('fs');

const NAVY = '1F3557';
const ACCENT = 'C15F3C';
const GREY = '595959';
const LIGHT = 'F2EEE9';

const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 220, after: 90 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY } },
    children: [new TextRun({ text, bold: true, color: NAVY, size: 22, font: 'Calibri', allCaps: true, characterSpacing: 20 })],
  });
}

function roleHeader(company, title, dates) {
  return new Paragraph({
    spacing: { before: 160, after: 40 },
    tabStops: [{ type: TabStopType.RIGHT, position: 10466 }],
    children: [
      new TextRun({ text: company, bold: true, size: 22, font: 'Calibri', color: '000000' }),
      new TextRun({ text: `  |  ${title}`, italics: true, size: 21, font: 'Calibri', color: GREY }),
      new TextRun({ text: `\t${dates}`, bold: true, size: 20, font: 'Calibri', color: NAVY }),
    ],
  });
}

function bullet(children) {
  return new Paragraph({
    numbering: { reference: 'cv-bullets', level: 0 },
    spacing: { after: 40, line: 252, lineRule: 'auto' },
    children,
  });
}

function b(text) { return new TextRun({ text, bold: true, size: 21, font: 'Calibri' }); }
function t(text) { return new TextRun({ text, size: 21, font: 'Calibri' }); }

function metricCell(big, small) {
  return new TableCell({
    width: { size: 2616, type: WidthType.DXA },
    borders: noBorders,
    shading: { type: ShadingType.CLEAR, fill: LIGHT },
    margins: { top: 100, bottom: 100, left: 60, right: 60 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [new TextRun({ text: big, bold: true, size: 26, font: 'Calibri', color: ACCENT })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: small, size: 18, font: 'Calibri', color: GREY })],
      }),
    ],
  });
}

function twoCol(left, right) {
  return new TableRow({
    children: [left, right].map(items => new TableCell({
      width: { size: 5233, type: WidthType.DXA },
      borders: noBorders,
      margins: { top: 20, bottom: 20, left: 0, right: 120 },
      children: items,
    })),
  });
}

function compBullet(text) {
  return new Paragraph({
    numbering: { reference: 'cv-bullets', level: 0 },
    spacing: { after: 30 },
    children: [new TextRun({ text, size: 20, font: 'Calibri' })],
  });
}

const doc = new Document({
  numbering: {
    config: [{
      reference: 'cv-bullets',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 340, hanging: 200 } }, run: { color: ACCENT } },
      }],
    }],
  },
  styles: { default: { document: { run: { font: 'Calibri', size: 21 } } } },
  sections: [{
    properties: {
      page: { margin: { top: 700, bottom: 700, left: 850, right: 850 } },
    },
    children: [
      // ===== Header =====
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [new TextRun({ text: 'ALEX COBOS', bold: true, size: 44, font: 'Calibri', color: NAVY, characterSpacing: 30 })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: 'Customer Success Manager — Enterprise SaaS & AI Adoption', bold: true, size: 24, font: 'Calibri', color: ACCENT })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 140 },
        children: [new TextRun({
          text: 'London, UK   |   alex.lopcob@gmail.com   |   +44 7432 686793   |   linkedin.com/in/alex-cobos',
          size: 20, font: 'Calibri', color: GREY,
        })],
      }),

      // ===== Metrics bar =====
      new Table({
        width: { size: 10466, type: WidthType.DXA },
        columnWidths: [2616, 2616, 2616, 2618],
        borders: { ...noBorders, insideHorizontal: noBorder, insideVertical: { style: BorderStyle.SINGLE, size: 12, color: 'FFFFFF' } },
        rows: [new TableRow({
          children: [
            metricCell('$11M+', 'ARR Portfolio'),
            metricCell('90%+', 'Renewal Rate'),
            metricCell('125%', 'Net Revenue Retention'),
            metricCell('15+ yrs', 'Client-Facing, Full Cycle'),
          ],
        })],
      }),

      // ===== Summary =====
      sectionHeading('Professional Summary'),
      new Paragraph({
        spacing: { after: 60, line: 256, lineRule: 'auto' },
        children: [
          t('Customer Success leader with '), b('15+ years in client-facing roles across the full sales cycle'),
          t(' — from new business development to strategic account management, relationship management, and '),
          b('C-suite advisory'), t(' — built at '), b('US-headquartered SaaS companies (Coursera, Wiley)'),
          t(' serving enterprise customers across EMEA from London. Managed '), b('$11M+ ARR across 30+ strategic accounts'),
          t(' (Volkswagen Group, Novartis, HSBC, BBVA) with 90%+ renewal rates and 125% NRR. '),
          b('Daily Claude power user'), t(' with hands-on command of Anthropic’s offering — '),
          b('Claude, Claude Code, and the API'), t(' — building custom AI agents that run my current business’s GTM and customer workflows. Genuinely passionate about what Anthropic is building and about helping enterprises turn frontier AI into measurable outcomes, safely.'),
        ],
      }),

      // ===== Experience =====
      sectionHeading('Professional Experience'),

      roleHeader('Pressure Calibration™', 'Co-Founder & Commercial Lead · London', 'Feb 2025 – Present'),
      bullet([t('Built a performance infrastructure business from zero: go-to-market strategy, CS framework, onboarding architecture, and diagnostic playbooks targeting enterprise revenue leaders — foundational build experience directly applicable to an early in-region CS team.')]),
      bullet([b('Design, build, and run custom AI agents with Claude Code'), t(' powering the company’s day-to-day operations — prospect research, outreach sequencing, onboarding content, and customer diagnostics — giving me practitioner-level fluency in agentic workflows, prompting techniques, and API-based integration patterns.')]),
      bullet([t('Created scalable customer-facing playbooks, success-measurement models, and documentation to support independent customer adoption; evaluated and implemented the SaaS tooling stack end-to-end.')]),

      roleHeader('Coursera', 'Senior Customer Success Manager — Strategic Accounts · London', 'May 2021 – Feb 2025'),
      bullet([b('US-headquartered SaaS company:'), t(' operated as the EMEA-based owner of strategic accounts, partnering daily across time zones with US-based Product, Engineering, and Sales — the voice of the customer into HQ roadmap prioritisation.')]),
      bullet([t('Owned '), b('$11M+ ARR across 30 strategic accounts'), t(' (Volkswagen Group, Novartis, HSBC, BBVA) as primary strategic advisor to C-suite and VP-level executives.')]),
      bullet([t('Delivered '), b('90%+ renewal rates and 125% NRR'), t(' through proactive risk mitigation, outcome-focused success planning, and rigorous health tracking; prevented six-figure churn events and drove hundreds of thousands in incremental expansion ARR.')]),
      bullet([t('Led end-to-end onboarding and adoption: monitored usage patterns to surface underutilisation, built adoption roadmaps, and removed barriers through change-management and enablement programmes across complex multi-stakeholder enterprise environments.')]),
      bullet([t('Ran Executive Business Reviews with Fortune 500 stakeholders, translating platform outcomes into measurable ROI; built a CS measurement framework centred on NRR, gross retention, and health scoring using Gainsight, Tableau, and Power BI.')]),
      bullet([t('Mentored CSMs, wrote the team’s process documentation and playbooks, and supported hiring and onboarding as the function scaled.')]),

      roleHeader('Wiley / CrossKnowledge', 'Global Account Director · London', 'Sept 2017 – May 2021'),
      bullet([t('At US-headquartered Wiley, managed 30+ enterprise SaaS accounts across EMEA and LATAM (HSBC, Barclays, Fortune 500), sustaining 90%+ renewal rates across a multi-million-dollar portfolio.')]),
      bullet([t('Designed adoption and change-management frameworks serving thousands of end users — train-the-trainer style enablement that cut time-to-adoption and lifted measurable engagement across HR and L&D platforms.')]),
      bullet([t('Built trusted-advisor relationships with C-level executives; navigated complex organisational silos to find expansion opportunities and exceed revenue targets.')]),

      roleHeader('Informa, Euromoney & Financial Times', 'Enterprise Sales & Account Management', '2009 – 2017'),
      bullet([t('Progressive B2B roles spanning '), b('the whole sales cycle — new business development through account and relationship management'), t(' — across Financial Services, Publishing, and Media.')]),
      bullet([t('Managed Fortune 500 relationships and complex multi-year deal cycles with a consistent record of revenue growth and customer retention.')]),

      // ===== AI & Technical Fluency =====
      sectionHeading('AI & Technical Fluency'),
      bullet([b('Anthropic offering, hands-on: '), t('daily Claude (Max) power user; build and orchestrate agents with Claude Code; working knowledge of the API, prompting techniques, and AI/ML concepts and how they map to enterprise use cases.')]),
      bullet([b('Applied agentic AI: '), t('custom agents in production for my own business across research, GTM, and customer success operations — I can credibly demo, teach, and troubleshoot AI workflows with both technical and non-technical stakeholders.')]),
      bullet([b('Certifications: '), t('Anthropic & DeepLearning.AI — AI/ML Applications (2024); Applied AI Workflows & Automation (2024–2025).')]),
      bullet([b('Stack: '), t('Gainsight · Salesforce · Tableau · Power BI · SaaS tooling evaluation & implementation.')]),

      // ===== Core competencies =====
      sectionHeading('Core Competencies'),
      new Table({
        width: { size: 10466, type: WidthType.DXA },
        columnWidths: [5233, 5233],
        borders: { ...noBorders, insideHorizontal: noBorder, insideVertical: noBorder },
        rows: [
          twoCol(
            [compBullet('Full-Lifecycle Ownership: New Business → Onboarding → Adoption → Renewal → Expansion'),
             compBullet('C-Suite & Multi-Level Stakeholder Engagement'),
             compBullet('Consumption- & Seat-Based SaaS Models'),
             compBullet('Executive Business Reviews & Success Planning'),
             compBullet('Usage Monitoring, Health Scoring & Churn Forecasting')],
            [compBullet('CS Function Design & Foundational / In-Region Build'),
             compBullet('Change Management & Organisational Enablement'),
             compBullet('Adoption Roadmaps & Value Realisation (ROI)'),
             compBullet('Scalable Playbooks & Process Documentation'),
             compBullet('Cross-Functional Collaboration & Voice of Customer')],
          ),
        ],
      }),

      // ===== Education =====
      sectionHeading('Education & Languages'),
      new Paragraph({
        spacing: { after: 40 },
        tabStops: [{ type: TabStopType.RIGHT, position: 10466 }],
        children: [b('MBA — London School of Economics'), new TextRun({ text: '\t2017 – 2018', size: 20, font: 'Calibri', color: NAVY, bold: true })],
      }),
      new Paragraph({
        spacing: { after: 80 },
        tabStops: [{ type: TabStopType.RIGHT, position: 10466 }],
        children: [b('BA Advertising & PR — ESIC Business & Marketing School'), new TextRun({ text: '\t2004 – 2009', size: 20, font: 'Calibri', color: NAVY, bold: true })],
      }),
      new Paragraph({
        spacing: { after: 40 },
        children: [
          b('Languages:  '),
          t('English (Native)  ·  Spanish (Native / Bilingual)  ·  Portuguese (Intermediate)  ·  French (Basic)'),
        ],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(process.argv[2] || 'Alex_Cobos_CV_Anthropic_CSM_London.docx', buf);
  console.log('written');
});
