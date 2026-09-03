# Pressure Calibration — ICP pivot to corporate executives

**Prepared by:** Chief Revenue Officer, Research Calibration
**Date:** 3 September 2026
**Status:** Recommendation for decision. Segment count pending Apollo re-authorisation (see §3).

---

## 0. The short version

1. **Yes, we can find them.** No B2B database lets you filter on age, but *total years of experience* is a filter in Apollo and a visible field in Sales Navigator. Mid-30s to late-40s maps to roughly 12–27 years of experience. Combine that with seniority (Director and above), company size (1,000+ employees) and location, and you have a list you can build today. The exact filter recipe is in §3. I could not run the live count because the Apollo connector's token expired mid-session; it needs re-authorising in your claude.ai connector settings and then the recipe runs in one call.
2. **Change the ICP** from "revenue leader worried about rep churn" to **"the executive under load: 35–49, Director or above, in a 1,000+ person company, buying for themselves first and for their leadership team second."**
3. **Change the wedge.** Lead with the individual programme (€2,000 / £2,000, 6 weeks). It sits under the discretionary development threshold most executives control. Expand to the leadership-team programme (€20,000) after the individual result.
4. **Rebuild the calculator** from "cost of losing a sales rep" to "cost of a degraded executive": their own capacity gap, the cascade into their direct reports, and the cost of an executive exit.
5. **First 7 days:** re-authorise Apollo, run the count, hand-build a 150-person pilot list from UK and Spain, and send the first sequence.

### Assumptions I made (correct me if wrong)

| Point in the brief | How I read it |
|---|---|
| "living imagery" | Unclear in the transcript. I assumed **geography = UK + Spain** (the two languages and currencies already on the calculator). If you meant something else (a lifestyle trait, a specific city), the persona in §2 changes slightly, the finding method in §3 does not. |
| "improve health, staff, or looking for an improvement" | Two buying moments in the same person: (A) their **own** health and capacity, (B) the **health and capacity of the people they lead**. The strategy sells (A) first and (B) second. |
| "executives" | Director, Head of, VP, SVP, C-level. Managers excluded. |
| "corporates" | 1,000+ employees. 500–1,000 accepted only when HQ is in UK or Spain. |

---

## 1. Review of the current strategy

Everything below is read from the live calculator (`index.html`), which is the only strategy artefact in the repository.

| Element | Today | Verdict |
|---|---|---|
| ICP | Revenue leaders (CRO, VP Sales, Sales Director) running a commercial team of ~15 | Narrow and defensive. The buyer has to admit the team is breaking before the maths works. |
| Core argument | Sustained pressure → top-rep attrition + pipeline loss | Strong logic, right numbers (SHRM 1.5× replacement, 17/81 revenue concentration, 67% decision-quality degradation). Keep the logic, change the subject. |
| Offer | 6-week programme. £20k / €20k team (up to 10), £2k / €2k per person | Team price needs HR or L&D sign-off in a corporate; individual price does not. The pricing already supports the pivot. |
| Lead magnet | Bilingual EN/ES cost calculator, six "pressure signals", one CTA (20-minute call, `hello@pressurecalibration.io`) | Well built. The inputs (ACV, deals per rep, ramp months) are things a sales leader will not type on a first visit. |
| Proof | Third-party stats only (ZoomInfo, Gartner, Culture Amp, Fullcast) | No first-party result. This is the single biggest gap for an executive buyer. |
| Language | "Pressure", "high performers", "quota" | Sales-floor vocabulary. Executives read it as "not about me". |

**What to keep:** the economic framing, the bilingual build, the single CTA, the price points, the "signals you are already seeing" device.
**What to retire:** the rep-churn model as the headline, the sales-only inputs, the assumption that the buyer is buying for someone else.

---

## 2. The new ICP

### 2.1 Definition

| Dimension | Target | Notes |
|---|---|---|
| Seniority | Director, Head of, VP, SVP, C-level (excluding CEO of 10k+ groups) | Apollo seniorities: `director`, `vp`, `c_suite`; plus `head` titles |
| Age band | 35–49 | Proxy: 12–27 total years of experience |
| Company size | 1,000+ employees (500+ if HQ in UK/Spain) | Apollo ranges `1001,5000`, `5001,10000`, `10001+` |
| Geography | UK and Spain, person-based (not HQ-based) | Assumption, see §0 |
| Functions | Sales/Revenue, Operations, Finance, Technology, General Management, Country/BU heads | HR and People leaders are **partners and sponsors**, not the primary target |
| Sectors (priority) | Professional services, financial services, tech/telco, pharma/medtech, industrial and consumer companies with regional HQs in London, Madrid, Barcelona | Sectors where the 35–49 executive carries a P&L and a long week |
| Moment A (self) | First health warning, sleep or weight drift, a doctor's comment, a milestone race (marathon, Hyrox, Ironman), a new wearable, a new bigger role | Buys the individual programme |
| Moment B (team) | New in role (<12 months), team restructure, sick-day or attrition creep, a wellbeing budget with no credible programme, a leadership offsite coming | Buys the team programme |
| Disqualifiers | Under 500 employees; public sector procurement; 55+; HR-run wellbeing RFPs; anyone whose only role is "wellbeing" | Slow, price-driven, or a different health economics |

### 2.2 Why this age band is the right one

- **Peak load.** They carry a P&L or a large function, usually with young children at home. It is the most compressed decade of a career.
- **First physiological decline.** Between 35 and 49 the first blood-test warnings, sleep debt and weight drift show up, while performance expectations still rise. Pressure Calibration's claim (physical load degrades decision quality before the metrics register it) lands hardest here.
- **They already self-track.** Highest adoption of Whoop, Oura and Garmin; the Hyrox and marathon boom is disproportionately this band of professionals. They understand "calibration" as a concept because they already measure themselves.
- **They control small budgets alone.** A €2,000 development spend is inside most executives' discretionary or L&D allowance. A €20,000 team spend is a sponsor conversation they can lead.

### 2.3 Two personas, one person

**The Subject** (buys for self). "I am running at 75% and everyone still thinks I am fine. I want a structured six weeks that fixes the physical base without stopping work." Objection: time. Proof needed: a measured before/after from someone like them.

**The Sponsor** (buys for the team). "My leadership team is grinding. I do not want a wellbeing webinar, I want something that changes how they show up on Thursday afternoon." Objection: budget owner is L&D or HR. Proof needed: their own result from the individual programme, plus the cascade maths.

---

## 3. Finding #1 — Can we find them?

**Answer: yes, at three layers. The first two are mechanical, the third is where the strategy lives.**

### 3.1 Layer 1 — Findable (list building)

No database (Apollo, LinkedIn Sales Navigator, ZoomInfo, Cognism, Lusha) exposes date of birth or age. GDPR means it is not in B2B datasets. Use proxies:

| Attribute | Proxy | Apollo filter | Sales Navigator equivalent |
|---|---|---|---|
| Age 35–49 | Total years of experience 12–27 (career start at 22–23) | `person_total_yoe_range: {min: 12, max: 27}` | "Years of experience: More than 10", then read graduation year on profile |
| Executive | Seniority + title | `person_seniorities: [director, vp, c_suite]` + `person_titles` | Seniority level: Director, VP, CXO |
| Corporate | Employer headcount | `organization_num_employees_ranges: ["1001,5000","5001,10000","10001,1000000"]` | Company headcount 1,001+ |
| UK / Spain | Person location | `person_locations: ["United Kingdom","Spain"]` | Geography |
| Reachable | Verified email | `contact_email_status: ["verified","likely to engage"]` | InMail |

**The exact Apollo call to run once the connector is re-authorised** (people search, no enrichment credits consumed until we reveal emails):

```json
{
  "person_seniorities": ["director", "vp", "c_suite"],
  "person_titles": [
    "managing director", "country manager", "general manager",
    "chief revenue officer", "vp sales", "sales director", "commercial director",
    "chief operating officer", "operations director", "vp operations",
    "chief financial officer", "finance director",
    "chief technology officer", "technology director", "vp engineering",
    "head of"
  ],
  "person_total_yoe_range": { "min": 12, "max": 27 },
  "organization_num_employees_ranges": ["1001,5000", "5001,10000", "10001,1000000"],
  "person_locations": ["United Kingdom", "Spain"],
  "contact_email_status": ["verified", "likely to engage"],
  "per_page": 25,
  "page": 1
}
```

Run it three times: (a) as above, (b) with `person_days_in_current_title_range: {max: 365}` for the new-in-role trigger, (c) with `q_organization_job_titles: ["wellbeing", "head of wellbeing", "wellbeing manager"]` for companies actively hiring wellbeing roles. The `total_entries` field in each response is the count.

**Order-of-magnitude expectation** (to be replaced by the live count):

| Step | UK | Spain | Basis |
|---|---|---|---|
| Companies with 1,000+ employees | ~2,500 | ~1,000 | ONS / INE enterprise size bands |
| Director+ per company (average) | ~50 | ~40 | Typical corporate leadership layer |
| Director+ population | ~125,000 | ~40,000 | Multiply |
| In the 12–27 years-of-experience band | ~60,000 | ~20,000 | Roughly half of a leadership layer |
| With a verified work email | ~25,000 | ~8,000 | 40% typical for Apollo at this seniority in Europe |

Even if these are off by half, the addressable pool is tens of thousands. The problem is never finding executives. It is finding the ones in Moment A or B.

Credit position as of today: 2,132 of 2,500 lead credits remaining this cycle (resets 23 September), zero mobile-number credits. Enough for the first 1,500-person list.

### 3.2 Layer 2 — Reachable

- Email: Apollo verified emails at this seniority land, but executives triage. Sequences must be short (five touches, three weeks) and mix LinkedIn with email.
- LinkedIn: the 35–49 executive is active on LinkedIn more than any other seniority band. Connection + voice note outperforms InMail.
- Assistant gate: at SVP/C-level in 5,000+ companies, expect an EA. Write the first email so it survives being forwarded.

### 3.3 Layer 3 — Identifiable as "looking" (the signals)

This is what turns a list into a pipeline. Score each name 0–5 on these, work the 4s and 5s first.

| Signal | Where it shows | Points |
|---|---|---|
| New role in the last 12 months | Apollo `days_in_current_title`, LinkedIn "Started new position" | 2 |
| Posts about running, Hyrox, marathon, cycling, wearables, sleep | LinkedIn posts, Strava clubs, race results (RunBritain, Hyrox results pages) | 2 |
| Company hiring wellbeing / people-experience roles | Apollo job postings, LinkedIn Jobs | 1 |
| Company publishes wellbeing KPIs in annual/ESG report | Annual reports, Glassdoor "benefits" | 1 |
| Executive MBA alumni (IESE, IE, ESADE, LBS, Saïd, Judge) | LinkedIn education | 1 |
| Engaged with our content or ran the calculator | Website visitor tracking (Apollo has 100 visitor credits unused), LinkedIn engagement | 3 |
| Headcount growth >10% in six months at their company | Apollo `headcount_growth` | 1 |

**Where they physically show up:** executive health check clinics (Bupa, Nuffield Health in the UK; Sanitas, Quirónsalud in Spain), corporate Hyrox and marathon teams, EMBA alumni events, leadership offsites, and the partner ecosystem of executive coaches. These are partner channels, not just observation posts (§6).

---

## 4. Positioning and message

### 4.1 One-line positioning

**Before:** "What is your team's pressure actually costing you?"
**After:** "Six weeks to recalibrate the executive your company runs on. Starting with you."

### 4.2 Message pillars

1. **Decision quality is physical.** The 67% decision-quality degradation under sustained physical load is the headline stat, now applied to the executive's own decisions rather than a rep's close rate.
2. **Capacity cascades.** An executive operating at 80% sets the ceiling for eight to twelve direct reports. The cost is not one salary, it is a layer.
3. **The body is infrastructure, not a benefit.** Wellbeing is what HR provides. Calibration is what a high-performing executive does to their own operating system, the same way they would to a plant or a pipeline.

### 4.3 Vocabulary

| Use | Avoid |
|---|---|
| load, capacity, calibration, recovery, decision quality, operating at, baseline, six weeks | wellbeing, wellness, burnout, mindfulness, self-care, resilience training, stress management |

The avoided words are HR-coded and commoditised; the executive has already deleted three emails this month containing them.

### 4.4 Calculator rework (spec for `index.html`)

Keep the shell, the bilingual toggle, the signals device, the CTA. Change the model:

**Inputs**
- Your fully-loaded compensation
- Number of direct reports and their average fully-loaded compensation
- Hours per week at the moment (default 55)
- Capacity you are operating at right now (slider, default 75%)
- Optional: revenue or budget you are accountable for

**Outputs**
- Cost of your own capacity gap (compensation × gap)
- Cascade: cost of the same gap across your direct reports, at half the rate
- Cost of an executive exit (2× compensation, SHRM executive band, plus 6-month vacancy)
- Programme cost and net saving for the individual programme and for the team programme
- Six "load signals" for executives: waking before the alarm, Sunday-evening dread, decision deferral, reading the same page twice, alcohol as a wind-down, weekends spent recovering not living

**Modes:** "For me" (individual price) and "For my leadership team" (team price). Default to "For me".

---

## 5. Offer architecture

| Tier | Price | Buyer | Approval | Role in the motion |
|---|---|---|---|---|
| Individual Executive Programme, 6 weeks | €2,000 / £2,000 | The Subject | Own discretionary or L&D allowance, usually no sign-off | **The wedge.** Fast yes, produces the first-party proof we lack. |
| Leadership Team Programme, up to 10 | €20,000 / £20,000 | The Sponsor | L&D, HR or the executive's own cost centre | **The expansion.** Sold after the individual result, with the cascade maths. |
| Executive Cohort (new, test in Q4) | €2,500 per seat, 8 seats, cross-company | The Subject | Same as individual | Creates peer proof, referrals and a waiting list. Only if Q3 individual sales exceed 10. |

**Proof mechanism:** every individual programme baselines three measured markers in week 0 and re-measures in week 6 (use whatever the programme already measures; if nothing is measured today, that is the first thing to fix). With written permission, each result becomes a one-paragraph case that feeds §6.

---

## 6. How we reach them: five motions

1. **Signal-led outbound.** Apollo list from §3.1, scored with §3.3, top 150 names per fortnight. Five-touch sequence over three weeks: LinkedIn connect with a one-line note → email 1 (calculator) → LinkedIn voice note or comment → email 2 (one first-party result) → email 3 (break-up, offers the 20-minute call at a fixed slot).
2. **Founder-led LinkedIn.** Three posts per week aimed at the persona, not at HR. Real executives training, recovering, and deciding. Every post ends with the calculator. Spanish and English alternating.
3. **Partner channels.** Executive health clinics (Bupa, Nuffield, Sanitas, Quirónsalud) as a referral for the "your results came back borderline" moment. Executive coaches and EMBA alumni offices (IESE, IE, ESADE, LBS) as introducers. Corporate Hyrox and marathon teams as a warm community.
4. **Inbound calculator.** The reworked "For me" calculator in §4.4, with Apollo website-visitor tracking installed so anonymous corporate visitors become named accounts (100 credits available, unused).
5. **Graduate referral loop.** Every individual graduate is asked, in week 6, for two names: one peer at another company and one person in their own leadership team. That is the bridge from €2,000 to €20,000.

### Example sequence, email 1 (EN)

> Subject: 75%
>
> {First name}, most executives I work with in {industry} tell me they are running at about 75% and nobody can tell. The maths on what that costs a leader with {n} direct reports is uncomfortable: {calculator link}.
>
> Six weeks, no time off, measured at the start and the end. If the number on that page is not interesting, delete this.
>
> {Signature}

Spanish version mirrors it; use *tú*, not *usted*, for this age band.

---

## 7. Targets for the first 90 days

| Stage | Volume | Rate |
|---|---|---|
| Names built and scored | 1,500 | |
| Names sequenced (score ≥3) | 600 | 40% of built |
| Replies | 36 | 6% |
| 20-minute calls | 20 | 55% of replies |
| Individual programmes sold | 8 | 40% of calls |
| Team programmes sold | 2 | from graduates' sponsors |
| Revenue | €56,000 | 8 × €2,000 + 2 × €20,000 |
| First-party cases published | 5 | with permission |

If reply rate is under 3% after 300 sends, the message is wrong, not the list. Stop and rewrite before sending more.

---

## 8. 90-day plan

**Weeks 1–2 (foundation)**
- Re-authorise Apollo; run the three counts from §3.1; record `total_entries`.
- Hand-build and score the first 150 names (75 UK, 75 Spain).
- Rewrite the sequence (EN + ES). Install Apollo website-visitor tracking on the calculator domain.
- Decide the three measured markers for the individual programme.

**Weeks 3–6 (first wave)**
- Send to the first 150; second 150 in week 4.
- Ship the "For me" calculator mode (§4.4). Keep the old sales-leader calculator live at a sub-path for existing pipeline.
- Start founder-led LinkedIn cadence.
- Close the first three individual programmes; baseline them properly.

**Weeks 7–12 (proof and expansion)**
- Publish the first cases at week 6 of the first cohort.
- Convert the first two Sponsors to team programmes.
- Sign two partner introducers (one clinic, one business school alumni office).
- Decide on the Executive Cohort SKU using actual individual demand.

---

## 9. Risks and open questions

- **First-party proof is zero today.** Every motion above depends on producing it fast. The first eight individual programmes are a research investment as much as revenue.
- **Age proxies leak.** Years-of-experience filters catch a 52-year-old who started late and miss a 36-year-old prodigy. Accept 15% noise; do not try to filter it out mechanically.
- **The team programme still needs HR.** The Sponsor lead reduces this but does not remove it. Build a one-page L&D justification the Sponsor can forward.
- **Two markets, one person.** UK and Spain double the language and content work. If capacity is tight, start with one and finish the other in Q1.
- **What does "living imagery" mean?** See §0. The answer may change the persona's texture.

---

## 10. Council review of the pivot

The decision on the table: *Move the ICP from revenue leaders with sales teams to corporate executives aged 35–49, selling to them directly for themselves first and their leadership teams second.*

### Step 1 — Five advisers

**Adviser 1 — The Contrarian**
This fails first on proof. You have zero first-party results and you are about to pitch the most sceptical buyer in the building, one who has sat through every wellbeing vendor HR ever bought. Second failure: the age proxy. Years of experience is a sieve, not a filter; you will spend credits on 50-year-olds and miss half the 36-year-olds. Third: the €2,000 wedge is a consumer purchase dressed as B2B. Executives will pay it, then never bring the team, because bringing the team means admitting the team is broken. The old ICP at least had a P&L reason to buy. Worst plausible outcome: nine months of €2,000 sales, no team deal, no case studies you are allowed to publish, and a founder-led LinkedIn feed that looks like a fitness influencer. What breaks first is the reply rate: under 3% by send 300, because the message reads as another wellness email with a nicer font.

**Adviser 2 — The First-Principles Thinker**
Strip it back. What is actually sold? A six-week intervention that changes a person's physical state so that their decisions improve. Who feels the cost of bad decisions most directly and can pay without asking? The person making them, if they control a budget. So the buyer was always the individual with authority; "sales leader" was just the first place you looked. The real question is not "executives or revenue leaders" but "who has both the pain and the pen". In a corporate, the 35–49 executive has the pen for €2,000 and influence for €20,000. That is a better fit than a sales director who has neither. Assumption to kill: that the calculator must model the company's loss. It should model *the buyer's* loss. Assumption to keep: that pressure degrades decisions; that is the product. Rebuild from there and the pivot is not a pivot, it is a correction.

**Adviser 3 — The Expansionist**
If this works, you own a category nobody has named: executive calibration as infrastructure, not benefit. The asymmetry is in the referral graph. One executive at a 5,000-person company is connected to a leadership team of ten, a peer group of thirty across the sector, and an EMBA cohort of sixty. Every individual sale is a node with three expansion paths, and the cross-company cohort turns the product into a network. Bigger version: an annual "calibration cycle" that leadership teams renew each year like an audit, priced per seat, with a benchmark report that only you can produce because only you have the before/after data. That data becomes the moat and the marketing. The €20,000 team programme is not the ceiling; the ceiling is a €150,000 leadership-layer contract renewed annually, and the individual programme is the free sample.

**Adviser 4 — The Outsider**
Dumb questions. Why does a company need a vendor for this? If an executive is tired, why don't they sleep more? What actually happens in the six weeks; is it a coach, a doctor, a gym plan? If I cannot explain it in one sentence to my brother-in-law, the executive cannot explain it to their finance director. Why is the price the same for a 5,000-person company and a 500-person one? Why is it €2,000 and not €5,000, given who is buying? Why are you selling to the person and not to the company that benefits? And the one nobody inside asks: is the customer buying performance, or is the customer buying permission to look after themselves? If it is permission, the whole message changes; the calculator becomes a note they can forward to their boss.

**Adviser 5 — The Executor**
Monday: re-authorise Apollo (five minutes, connector settings), run the three searches in §3.1, write the counts at the top of this document. Tuesday: build the first 150 names in a sheet with the seven signal columns from §3.3; score them; nobody under 3 gets sequenced. Wednesday: write the five-touch sequence in English and Spanish, one page each, and send the English version to two friendly executives for a brutal read. Thursday: decide the three markers the programme measures; if there are none, that is the day's only job. Friday: send touch one to the top 50, and ship the "For me" toggle on the calculator even if the maths is a first pass. Defer: the cohort SKU, the partner channel, the annual benchmark. Do not touch those until eight individual programmes are sold.

### Step 2 — Anonymous peer review

Responses were shuffled and labelled A–E before review.

**Reviewer 1 (the Contrarian's seat)**: Ranking, best to worst: C, E, B, D. Response C got closest to the real mechanism by asking who has both the pain and the pen; it is the only response that made the pivot look like a correction rather than a bet. E is the only one that is actionable by Friday. B is seductive and premature; it prices a network that does not exist. D asked the right dumb question about permission but did not follow it to a decision.

**Reviewer 2 (the First-Principles seat)**: Ranking: A, E, D, B. A's failure list is the only rigorous test of the argument; the proof gap and the 3% threshold are real. E converts thinking into a calendar without adding claims. D's "permission" question is the sharpest single sentence in the pack and deserves a test. B assumes a referral graph that behaves like software; a six-week physical programme is not viral.

**Reviewer 3 (the Expansionist's seat)**: Ranking: C, D, E, A. C is right that the individual was always the buyer; it under-sells what that unlocks. D's question about why the price is the same for every company size is a pricing insight worth money. E is fine but treats the cohort and partners as distractions when they are the compounding part. A is useful for the reply-rate tripwire and wrong that executives will not bring the team; sponsors bring teams when they have their own result to point to.

**Reviewer 4 (the Outsider's seat)**: Ranking: E, A, C, B. E is the only response I could hand to someone and expect action. A says out loud what everyone is thinking about proof. C is clever but uses words like "pen" and "pain" that sound like the industry talking to itself. B lost me at "referral graph".

**Reviewer 5 (the Executor's seat)**: Ranking: A, C, D, B. A sets the tripwire I will actually use (3% by send 300). C tells me why I am doing it, which helps when the first week is quiet. D's permission question changes the email copy and I will test it as a variant. B is a Q2 conversation.

### Step 3 — The Chairman's call

**Decision:** make the pivot. Sell to the 35–49 corporate executive, individually first, team second. Stop leading with rep churn this week.

**The one strongest reason:** the individual executive is the only buyer who has both the pain and the authority to pay without asking. The old ICP had neither. This is not a new market; it is the buyer the product always had.

**The one biggest risk:** proof. Zero first-party results in front of the most vendor-weary buyer in the company. Every early sale must be measured (three markers, week 0 and week 6) and published with permission, or the expansion to team programmes never happens. Watch the tripwire: under 3% reply by send 300 means the message is wrong, and the fix is copy, not list.

**Next seven days:** re-authorise Apollo and run the three counts in §3.1. Build and score 150 names (UK and Spain). Write the five-touch sequence in both languages, including a "permission" variant of email 1 that the executive can forward to their boss. Decide the three measured markers. Send touch one to the top 50 by Friday. Defer the cohort SKU, the partner channel and the annual benchmark until eight individual programmes are sold.
