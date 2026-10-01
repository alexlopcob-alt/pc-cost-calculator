# job-search — Madrid + remote EMEA

Operating files for Alex Cobos's job search. Everything is generated from `MASTER_PROFILE.md`.

| File | Purpose |
|---|---|
| `ORCHESTRATOR.md` | How the single daily routine runs the search: roles, order of operations, standing rules, where things live. Read first. |
| `MASTER_PROFILE.md` | Canonical facts. The only place numbers, dates, titles and standard answers live. |
| `TARGETING_RULES.md` | Geography, scope, exclusions, fit score, caps, salary policy. |
| `SECURITY_GUARDRAILS.md` | What automation may never do; credentials; LinkedIn safety; untrusted content. |
| `ENGINE_PATCH.md` | Drop-in changes for the Mac Engine (`~/Desktop/PC/ENGINE/v2/`). Apply once. |
| `OUTREACH_TEMPLATES.md` | EN and ES notes for hiring managers, nudges, thank-yous, recruiters, fractional pitches. |
| `TARGETS_MADRID_EMEA.md` | Seed list of Madrid hubs and remote EMEA employers, recruiters to approve. |
| `cv/build_cvs.js` | Builds the three CVs. `node build_cvs.js` regenerates `.docx`; PDFs are printed from the HTML twin with headless Chromium. |
| `cv/*.docx` | ATS uploads. `cv/*.pdf` for email and LinkedIn. |
| `AUDIT_LOG/YYYY-MM-DD.md` | One file per daily audit. |
| `engine-sync/` | Daily export from the Mac Engine (send log, reports, tracker). Must contain no secrets. |

Tracker of record: Notion "Job Application Tracker → Applications" (42 rows as of 1 Oct 2026).

Branch of record since 1 Oct 2026: `claude/elegant-goodall-l1f7ga`. The earlier branch `claude/madrid-emea-job-applications-ph943q` is merged here and retired.

## Rebuild the CVs

```bash
cd job-search/cv
NODE_PATH=<path with docx installed> HTML_OUT=/tmp node build_cvs.js
for f in Alex_Cobos_CV_EN_Madrid Alex_Cobos_CV_EN_Remote_EMEA Alex_Cobos_CV_ES_Madrid; do
  chromium --headless --no-pdf-header-footer --print-to-pdf=$f.pdf file:///tmp/$f.html
done
```

Only three zones may be tailored per role: the headline line, the summary paragraph, and the order of Core Competencies. Dates, numbers, employers and titles never change per role.
