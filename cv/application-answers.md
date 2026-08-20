# Anthropic CSM (London) — Application Answers

## Q: Describe your experience driving customer adoption and value realization across technical products such as APIs, AI/ML platforms, or cloud-based solutions within enterprise accounts. Specifically, tell us which products were consumption-based versus seat-based, what health signals and expansion levers you used for each, and how your approach differed between the two models.

My enterprise portfolio has been seat-based, and I'd rather be precise about that than blur the two models.

**Seat-based: Coursera for Business, Wiley/CrossKnowledge.** At Coursera I owned $11M+ ARR across 30 strategic accounts — Volkswagen Group, Novartis, HSBC, BBVA — all licence-based enterprise deployments. At Wiley/CrossKnowledge it was the same model across 30+ accounts in EMEA and LATAM.

The health signals I ran on were activation rate (licences assigned versus actually activated), weekly actives as a proportion of the contracted base, time-to-first-value after provisioning, engagement depth via completion rates and hours per active user, breadth of uptake across business units, and admin and sponsor engagement. Executive sponsor turnover was consistently my single best churn predictor — better than any usage metric. I tracked these in Gainsight with Tableau and Power BI, rolled into a health score I built for the team.

The expansion levers were seat growth into new departments, geographies and business units; tier and content-catalogue upgrades; and multi-year commitments. The discipline that made it work is that you cannot credibly sell more seats while a meaningful share of the existing ones sit dormant. So the motion was always utilisation first — activation campaigns, manager-led enablement, train-the-trainer, Centre of Excellence structures — then evidencing that utilisation as ROI in an Executive Business Review, then using that evidence to justify the next tranche. That sequence is what produced 90%+ renewals and 125% NRR.

The structural point about seat-based revenue is that it's fixed at signature and recognised whether or not anyone logs in. Under-adoption costs you nothing this year and everything at renewal, so the risk is invisible in the revenue data and arrives as a cliff. That forces a proactive, change-management-heavy motion: you have to manufacture engagement, because nothing in the numbers warns you in time.

**Consumption-based: my experience here is as a builder, not as a CSM of consumption accounts.** I run Anthropic's API and Claude Code in production for my own business, so I live the economics directly — token spend against output, model selection as a cost/performance decision, caching and prompt efficiency, and what happens to unit cost when a workload scales.

That vantage point has made the differences in how the two models have to be managed very concrete to me. In consumption, usage *is* revenue in real time, so the feedback loop is days rather than quarters and a dip is an immediate signal rather than a renewal-day surprise. The unit of adoption is the workload, not the individual user: the question shifts from "are people logging in?" to "what's in production, what's stuck in pilot, and what's blocking the next one?" The stakeholders move from L&D and programme owners to engineering leads and platform teams. And technical friction — rate limits, latency, error rates, the wrong model for the job — suppresses growth in a way that has no real equivalent in a seat model.

The counterintuitive part, and the one I'd expect to matter most at Anthropic: in consumption the right move is sometimes to *lower* a customer's unit cost — a cheaper model for simple tasks, prompt caching, batching — which reduces near-term revenue but proves you're optimising for their outcome and unlocks the larger workloads that follow. You never face that trade in a seat model, where the incentive runs one way.

What transfers cleanly is the executive relationship work, change management, multi-stakeholder navigation, and translating usage into ROI a CFO will accept. What I'd adapt is the instrumentation and the cadence, and spending materially more of my time with engineering.

---

### Notes to self before submitting
- If any Coursera or Wiley deal had a usage-based, credit-pool or overage component, add one sentence — it converts "builder only" into "some enterprise consumption exposure". Only if genuinely true.
- Expect the interview follow-up: "how would you run your first 90 days on a consumption account?" Answer: instrument the baseline, map every workload by stage (pilot / staging / production), find the blocked ones, and pick the two most replicable to prove out.
- CV was corrected to match this: the Core Competencies line no longer claims consumption-based model experience.
