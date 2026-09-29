# ENGINE PATCH v3 — apply once on the Mac

The Engine runs on Alex's Mac under `~/Desktop/PC/ENGINE/v2/`. This cloud session cannot reach it, so this file is the patch. Paste the blocks below into the files named. Where a file name is a guess, put the block in the equivalent file and keep the rule text unchanged.

Time to apply: about 15 minutes. Do it in a NEW chat, never inside a scheduled-task chat.

## 0. Stop the bleeding (do these first)

1. Open Claude Desktop, cmd+Q, reopen. Close every chat that a scheduled task opened.
2. In the scheduled tasks list: **disable** `engine-apply` (launchd `com.alexcobos.jobengine-apply`), `engine-resolve`, `engine-outreach` and `desk-sync` until steps 1–5 below are in place. Leave the scanner, the scorer and the brief running.
3. In LinkedIn, withdraw pending invitations older than 3 weeks until the pending count is under 50.
4. Remove `sudo pmset -a disablesleep 1` from every "needs you" template. Replace with the `caffeinate` line in SECURITY_GUARDRAILS.md section 3.

## 1. `ENGINE/v2/RULES.md` (or the top of the applier, scorer and outreach prompts)

```
GEOGRAPHY FILTER (before scoring, hard):
  ALLOW: city == Madrid; country == Spain AND remote == true; region in {EMEA, Europe} AND remote == true AND Spain not excluded
  DENY: everything else, including London, UK, Barcelona on-site, "Remote, UK", "Remote, Germany"
  London cap = 0. Delete the London backlog from READY. Move London cards to status=dropped_geo.

SCOPE FILTER (before scoring, hard):
  DENY titles containing: SDR, BDR, Inside Sales, Field Sales, Support, Service Desk, Onboarding Specialist, Implementation Specialist, CS Operations, Junior, Associate, Intern
  DENY JDs requiring a language other than Spanish or English
  DENY commission-only, contract < 12 months, agency postings without a named client (score only, never submit personal data)

FIT SCORE: use the table in job-search/TARGETING_RULES.md. Apply threshold 7. Touch threshold 8.

DAILY CAPS: submissions 6, hiring-manager emails 10, LinkedIn notes 10, Easy Apply 6, fractional pitches 3/week.

HM_TOUCH_MANDATORY: a fit 8+ card is not submitted unless a hiring-manager or recruiter contact is resolved and a note is queued for the same day. If no contact can be resolved after two attempts, submit anyway and log "no_contact".

NEEDS_ALEX (never auto-answer): non-compete, confidentiality, background/criminal/credit consent, references, assessment consent, salary below floor, any upload other than CV and cover letter, any account creation.

STANDARD ANSWERS: read job-search/MASTER_PROFILE.md "Standard form answers". Phone +34 690 660 128 on every form. Address city+postcode only.

DUPLICATES: one application per company per 90 days. RF-DUP cards stay parked. RELAX-DUP is off.
```

## 2. CV selection rule (applier)

```
if JD language == es or employer HQ == Spain and JD in Spanish: use cv/Alex_Cobos_CV_ES_Madrid.docx
elif location == Madrid: use cv/Alex_Cobos_CV_EN_Madrid.docx
else (remote EMEA): use cv/Alex_Cobos_CV_EN_Remote_EMEA.docx
Per-role tailoring is allowed ONLY in: the headline title line, the 3-line summary, and the order of the Core Competencies. Never edit dates, numbers, employers or titles. Every generated CV is diffed against the base; a diff outside those three zones fails the run.
```

Delete `templates/` variants that predate 2026-09-28. Keep `templates/_bak_20260826/` as history only.

## 3. Outreach (this is where the interviews come from)

Replace the outreach prompt with `job-search/OUTREACH_TEMPLATES.md`. Sequence per submission:

| Day | Action | Channel |
|---|---|---|
| 0 | Submit | ATS |
| 0 | Note to hiring manager (fit 8+) or recruiter | Email if address resolvable, else LinkedIn note |
| 7 | First nudge | Same channel |
| 14 | Second nudge, then close | Same channel |
| Interview held | Thank-you within 4 hours | Email |
| Interview + 5 working days | Status nudge | Email |

Priority order of the touch queue: Madrid fit 9 → Madrid fit 8 → remote EMEA fit 9 → remote EMEA fit 8. Rejected companies are removed from the queue the same day.

## 4. Brief and audit

- The morning brief keeps its format but drops: street address, meeting passcodes, join links, and any `sudo` instruction.
- The brief adds a **Madrid funnel line**: cards seen / scored 7+ / submitted / touched / replies / interviews, week to date.
- The brief adds a **guardrail line**: submissions outside the geography filter (must be 0), auto-answered needs_alex questions (must be 0), LinkedIn pending invites (must be < 50).
- The weekly report goes to `ENGINE/reports/WEEK_<iso>.md` as today, plus a copy is pasted into the Notion tracker page "Weekly audits".

## 5. Reliability (the losses were mostly here)

- Laptop on mains, lid open, `caffeinate -dimsu` wrapped around each launchd job. No `pmset disablesleep`.
- Each scheduled task gets a 20-minute hard timeout and writes a heartbeat file. A watchdog launchd job every 30 minutes kills any task past its timeout and closes its chat, so a stuck chat never blocks the next run.
- `claude auth login` expiry: the watchdog checks `claude auth status` hourly and sends one macOS notification when it fails, instead of silently skipping runs.
- The scorer runs with a fixed JD budget per run and never blocks the applier.
- Every send is logged to `ENGINE/logs/sends.jsonl` with `{ts, channel, target, template, cv_sha256, card_id}`.

## 6. What to delete

- The "in London from 1 October" line in every template.
- The UK phone number from every template and standard-answer file.
- The London READY backlog, the 148/213 ALEX_YES London cards, and the London hiring-manager queue entries.
- The `RELAX-DUP` feature.

## 7. Sync with the cloud session

Once a day, push `ENGINE/logs/sends.jsonl`, `ENGINE/reports/`, and the tracker export to this repo under `job-search/engine-sync/` (a `git add && git commit && git push` in the desk-sync task). The cloud audit reads them at 07:52 Madrid time. Nothing in that folder may contain secrets; the audit greps for them and fails loudly if found.
