<!--
Sync Impact Report:
- Version change: 1.0.0 -> 1.1.0
- Modified principles: N/A
- Added sections: Core Principles (VI-IX), Data & State Management
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs:
  - TODO(RATIFICATION_DATE): original adoption date not provided
-->

# Text Adventure Game REST API Constitution

## Core Principles

### I. RESTful Design (Non-Negotiable)

All endpoints MUST follow REST conventions: resource-oriented URLs, standard
HTTP verbs, stateless requests, and correct status codes with consistent error
payloads. The API MUST avoid RPC-style patterns unless explicitly justified in
the spec. Rationale: consistent REST design keeps client integrations
predictable and reduces integration bugs.

### II. Documentation Clarity (OpenAPI 3.0.1)

Every endpoint MUST be documented in OpenAPI 3.0.1, and the OpenAPI document
MUST be updated in the same change as any API modification. Undocumented
endpoints are not allowed. Rationale: the OpenAPI contract is the source of
truth for client integration and test generation.

### III. Testability via Unit Tests

Every feature MUST ship with unit tests that cover core logic, edge cases, and
error paths. Tests MUST be runnable in CI and kept in sync with behavior
changes. Rationale: unit tests provide fast, reliable feedback and prevent
regressions as the game logic evolves.

### IV. Simplicity Over Cleverness

Prefer the simplest solution that meets requirements. Complexity MUST be
explicitly justified in the plan when no simpler alternative works. Rationale:
simple designs are easier to test, document, and maintain.

### V. Performance Budget

All endpoints MUST respond under 200ms in normal load conditions, with
performance checks included in validation or monitoring. Rationale: fast
responses are essential for interactive game experiences.

### VI. Security and Rate Limits

All endpoints MUST validate input, enforce authentication where required, and
apply rate limits for abuse protection. Security-sensitive data MUST never be
exposed in logs or error payloads. Rationale: protecting player data and system
stability is foundational to trust.

### VII. Observability and Diagnostics

Every feature MUST emit structured logs with request correlation and key
domain events. Failures MUST be diagnosable without reproducing in production.
Rationale: fast diagnosis reduces downtime and player frustration.

### VIII. Client Experience and Error Contracts

Responses MUST use stable schemas with actionable, human-readable error
messages and consistent machine-readable codes. Breaking changes MUST be
explicitly versioned and communicated in the spec. Rationale: predictable
contracts reduce client-side complexity.

### IX. State and Persistence Discipline

Game state persistence MUST be explicit, validated, and migrated safely when
schemas evolve. Data ownership and lifecycle MUST be documented in the spec.
Rationale: stable state management prevents player progress loss.

## API Standards

- OpenAPI 3.0.1 is the authoritative contract for clients and testing.
- OpenAPI MUST include request/response schemas and realistic examples.
- Response payloads MUST include consistent error shapes and stable fields.
- Backward-incompatible API changes require explicit approval in the plan and
  a versioning note in the spec.

## Data & State Management

- Persistence rules for game state MUST be documented in the spec.
- Schema changes MUST include a migration or compatibility plan.

## Quality Gates

- All PRs MUST include updated OpenAPI 3.0.1 for API changes.
- Unit tests MUST be added or updated for every feature.
- Performance validation MUST confirm the 200ms response budget is met.
- Security checks MUST cover input validation, auth, and rate limiting.
- Observability MUST include request correlation and error diagnostics.
- Error response schemas MUST match the OpenAPI contract.
- Complexity exceptions MUST be documented in the plan's Complexity Tracking.

## Governance

- This constitution overrides conflicting guidance in other documents.
- Amendments require a documented rationale, PR approval, and a version bump.
- Versioning follows semantic versioning: MAJOR for breaking governance
  changes, MINOR for new principles or material expansions, PATCH for
  clarifications.
- Compliance MUST be verified during spec, plan, and task reviews.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date not provided | **Last Amended**: 2026-02-06
