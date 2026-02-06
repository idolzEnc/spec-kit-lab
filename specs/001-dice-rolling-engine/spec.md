# Feature Specification: Dice Rolling Engine

**Feature Branch**: `001-dice-rolling-engine`  
**Created**: 2026-02-06  
**Status**: Draft  
**Input**: User description: "Build a dice rolling engine that supports standard dice notation (e.g., 2d6, 1d20+5, 3d8-2), parsing expressions like \"2d6+1d4+3\", returning individual rolls and total, advantage/disadvantage (roll twice, take higher/lower), and cryptographically secure random number generation."

## User Scenarios & Testing _(mandatory)_

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Roll Standard Dice Expressions (Priority: P1)

As a player, I want to submit a standard dice expression and get the total so
I can resolve game outcomes quickly.

**Why this priority**: It is the core behavior and delivers immediate value on
its own.

**Independent Test**: Can be fully tested by submitting valid expressions and
verifying totals are within expected ranges.

**Acceptance Scenarios**:

1. **Given** the expression "2d6", **When** it is evaluated, **Then** the
   result total is between 2 and 12.
2. **Given** the expression "1d20+5", **When** it is evaluated, **Then** the
   result total is between 6 and 25.

---

### User Story 2 - View Individual Rolls (Priority: P2)

As a player, I want to see each die result and per-term totals so I can verify
the roll outcome.

**Why this priority**: It builds trust and transparency without changing the
core rolling behavior.

**Independent Test**: Can be fully tested by checking that each term includes
individual die values and the overall total matches the sum.

**Acceptance Scenarios**:

1. **Given** the expression "2d6+1d4+3", **When** it is evaluated, **Then**
   the response includes each individual die value and the overall total.

---

### User Story 3 - Advantage and Disadvantage (Priority: P3)

As a player, I want to roll with advantage or disadvantage so I can follow
common tabletop rules.

**Why this priority**: It is a common dice mechanic but not required for the
core roll flow.

**Independent Test**: Can be fully tested by ensuring two roll sets are
returned and the selected total is the higher or lower result as requested.

**Acceptance Scenarios**:

1. **Given** the expression "1d20+5" with advantage, **When** it is
   evaluated, **Then** two roll sets are returned and the higher total is
   selected.
2. **Given** the expression "1d20+5" with disadvantage, **When** it is
   evaluated, **Then** two roll sets are returned and the lower total is
   selected.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- Invalid syntax such as "2dd6", "d20", or trailing operators returns a
  validation error.
- Expressions containing zero or negative dice counts or sides are rejected.
- Excessive dice counts, sides, or term counts are rejected with a clear error.
- Whitespace around operators is ignored without changing meaning.
- Totals can be negative when modifiers exceed rolled sums.

## Requirements _(mandatory)_

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST parse standard dice notation in the form NdM with
  optional +/- integer modifiers (for example, "2d6", "1d20+5", "3d8-2").
- **FR-002**: System MUST parse additive expressions composed of multiple dice
  terms and constants (for example, "2d6+1d4+3").
- **FR-003**: System MUST return the total result for a valid expression.
- **FR-004**: System MUST return individual die results and per-term totals
  alongside the overall total.
- **FR-005**: System MUST support advantage and disadvantage by rolling the
  entire expression twice and selecting the higher or lower total.
- **FR-006**: System MUST include both roll sets when advantage or
  disadvantage is used, along with the selected total.
- **FR-007**: System MUST use a cryptographically secure source of randomness
  for all dice rolls.
- **FR-008**: System MUST reject invalid syntax with a clear validation error.
- **FR-009**: System MUST enforce limits of 100 total dice, 1,000 sides per
  die, and 20 total terms per expression.
- **FR-010**: System MUST ignore whitespace around operators and terms.

### Non-Functional Requirements

- **NFR-001**: Every API change MUST update the OpenAPI 3.0.1 specification.
- **NFR-002**: Every feature MUST include unit tests for core logic and error
  paths.
- **NFR-003**: API endpoints MUST meet the <200ms response time budget under
  normal load conditions.
- **NFR-004**: Requests MUST validate inputs and enforce auth and rate
  limiting where applicable.
- **NFR-005**: Responses MUST use stable schemas with consistent error codes
  and messages.
- **NFR-006**: The API MUST emit structured logs with request correlation for
  diagnostics.
- **NFR-007**: State changes MUST include a persistence and migration plan
  when schemas evolve.

### Key Entities _(include if feature involves data)_

- **DiceExpression**: The raw input string, parsed terms, and any
  advantage/disadvantage mode.
- **DiceTerm**: A single term representing count, sides, and an optional
  modifier.
- **RollResult**: The overall total, per-term totals, and individual die
  outcomes.
- **RollSet**: A full evaluation of the expression, used to represent each
  roll when advantage/disadvantage is applied.

## Assumptions

- Rolls are evaluated statelessly and are not persisted by default.
- Advantage/disadvantage applies to the entire expression, not individual
  terms.
- The limits in FR-009 are acceptable for the intended use and can be revised
  later with explicit product input.

## Success Criteria _(mandatory)_

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 95% of roll requests complete in under 200ms under normal load.
- **SC-002**: 100% of valid expressions in the unit test suite return correct
  totals and include the expected number of individual rolls.
- **SC-003**: 100% of advantage/disadvantage test cases return two roll sets
  and select the correct higher or lower total.
- **SC-004**: 100% of invalid inputs in the unit test suite return a
  validation error with a clear message.
- **SC-005**: A security review confirms all rolls use a cryptographically
  secure source of randomness.
