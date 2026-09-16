---
name: pipeline-operator
description: Maintain DAY AGENCY business-development pipeline state, next actions, evidence confidence and opportunity movement using the configured source of truth.
---
# Pipeline Operator

## Purpose
Turn lead lists into an actively managed revenue pipeline.

## Default source of truth
If no CRM/Sheet is specified, use `V4/runtime/pipeline.csv` in the DAY AGENCY skills repository.

## Pipeline stages
`NEW → RESEARCHED → QUALIFIED → READY_TO_CONTACT → CONTACTED → REPLIED → DISCOVERY → PROPOSAL → NEGOTIATION → WON / LOST / NURTURE`

Do not advance a stage without evidence of the stage transition.

## Required fields per active item
- account_name
- industry
- geography
- source
- opportunity_score
- evidence_confidence
- current_stage
- primary_problem_or_opportunity
- offer_angle
- contact_or_access_path (only verified/public/user-provided)
- latest_interaction_date
- latest_interaction_summary
- next_action
- next_action_date
- owner
- estimated_value (only user-provided/approved)
- blocker
- loss_reason when applicable
- notes

## Operating rules
1. Deduplicate by organization and opportunity context.
2. Every active item must have a next action and date, unless waiting on an external event with a stated review date.
3. Flag stale items when no movement occurs beyond the expected cadence.
4. Record why an account is disqualified/lost so the system learns process-level patterns without storing unnecessary personal data.
5. Never interpret silence as rejection or purchase intent without evidence.
6. Separate estimated value from committed/signed revenue.

## Review logic
On review, group accounts into:
- MOVE NOW — next action can progress the deal.
- WAIT / NURTURE — reason and review date known.
- BLOCKED — blocker needs user/team decision.
- DROP — no longer worth time; reason documented.

## Output
`Changes since last review → Active pipeline by stage → Stale/blockers → Next actions → Data gaps → Decisions required`

## Guardrails
Do not store secrets, passwords, payment information or unnecessary sensitive personal data in pipeline state.