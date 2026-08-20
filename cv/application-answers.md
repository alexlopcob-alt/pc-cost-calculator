# Anthropic CSM (London) — Application Answers

## Q: Describe your experience driving customer adoption and value realization across technical products such as APIs, AI/ML platforms, or cloud-based solutions within enterprise accounts. Specifically, tell us which products were consumption-based versus seat-based, what health signals and expansion levers you used for each, and how your approach differed between the two models.

All of my enterprise work has been seat-based, so let me be clear about which half of this I've done and which half I haven't.

At Coursera I looked after around $11M in ARR across 30 strategic accounts, including Volkswagen Group, Novartis, HSBC and BBVA. Before that I spent four years at Wiley/CrossKnowledge on much the same model across EMEA and LATAM. Both were licence deals. A company buys a block of seats, we assign them, and the whole thing lives or dies on whether people actually use them.

The signals I watched were activation first, meaning how many of the licences we'd handed out had actually been switched on. Then weekly actives as a share of the contracted base, how long it took someone to reach a first real session after we provisioned them, and depth once they were in: completion rates, hours per active user. I also tracked how far usage had spread beyond the original department, because an account concentrated in one team is fragile no matter how good the numbers look.

The signal that mattered most wasn't a usage metric at all. It was sponsor stability. Almost every serious churn risk I dealt with started with the executive who signed the deal moving on. I got to the point where I'd hear about a reorg and start rebuilding the relationship map that week, well before anything showed up in the data.

Expansion meant seats into new departments, regions and business units, plus tier upgrades and multi-year renewals. But you can't credibly ask for more seats when a third of the ones they've already paid for are sitting unused. So the sequence was always the same: fix utilisation, prove it in an EBR in terms a CFO will accept, then use that as the basis for the next tranche. That's what produced 90%+ renewals and 125% NRR.

The thing about seat revenue is that it's banked the day the contract is signed. If nobody logs in, that costs you nothing this year and the whole renewal the year after, and you usually find out too late to do much about it. So you run a proactive, fairly hands-on change management motion, because the numbers won't warn you in time.

On consumption I should be straightforward: I haven't managed a consumption account as a CSM. What I have is the builder's side of it. I run Anthropic's API and Claude Code in production for my own business, so I watch token spend against what I actually get back, choose models on cost versus quality, and I've had the experience of a workload getting steadily more expensive as it scaled and having to go and fix it.

That's made the difference fairly clear to me. With consumption, usage is the revenue, so you see a problem in days rather than at renewal. What you're tracking isn't people, it's workloads: what's genuinely in production, what's stuck in a pilot, what's blocking the next one. You're mostly talking to engineers rather than L&D. And a lot of what holds growth back is technical friction, things like rate limits, latency, or the wrong model for the job.

The part I find genuinely interesting is that sometimes the right move is to make a customer's usage cheaper, through caching or a smaller model for the simple tasks. That costs you revenue this month and earns you a much bigger workload later. There's no equivalent of that decision in a seat model, where the incentive only ever runs one way.

The relationship work, the change management and turning usage into a number a CFO will sign off on all carry over. What I'd have to change is what I measure, how often I look at it, and spending a lot more of my week with engineering.

---

### Notes to self before submitting
- If any Coursera or Wiley deal had a usage-based, credit-pool or overage component, add a line about it. That turns "builder only" into real enterprise consumption exposure. Only if it's actually true.
- Likely interview follow-up: "how would you run your first 90 days on a consumption account?" Answer: get the baseline instrumented, map every workload by stage (pilot / staging / production), find the blocked ones, pick the two most replicable and prove those out.
- CV was corrected to match this. The Core Competencies line no longer claims consumption-based model experience.
