---
description: "Task list for dice rolling engine implementation"
---

# Tasks: Dice Rolling Engine

**Input**: Design documents from /specs/001-dice-rolling-engine/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Unit tests are REQUIRED for every feature. Include test tasks for each user story and ensure they fail before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: [ID] [P?] [Story] Description

- [P]: Can run in parallel (different files, no dependencies)
- [Story]: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per plan in src/, prisma/, tests/
- [x] T002 Initialize Node.js/TypeScript project and dependencies in package.json and tsconfig.json
- [x] T003 [P] Configure Jest test setup in jest.config.ts and package.json scripts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Setup Prisma schema and migration for RollAudit in prisma/schema.prisma
- [x] T005 [P] Implement RollAudit repository in src/repositories/rollAuditRepository.ts
- [x] T006 [P] Add API error types and response helpers in src/lib/errors.ts
- [x] T007 [P] Add structured logger and request correlation in src/lib/logger.ts
- [x] T008 [P] Add crypto-secure RNG helper in src/lib/random.ts
- [x] T009 [P] Add rate limiting middleware in src/lib/rateLimit.ts
- [x] T010 Add Express app wiring and middleware registration in src/app.ts
- [x] T011 Add /rolls route scaffold in src/routes/rollRoutes.ts
- [x] T012 Add roll request validation schema in src/validators/rollRequestSchema.ts
- [x] T013 Add roll controller skeleton in src/controllers/rollController.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Roll Standard Dice Expressions (Priority: P1) MVP

**Goal**: Parse standard dice expressions and return a valid total using secure randomness

**Independent Test**: Submit "2d6" or "1d20+5" and verify totals fall within expected ranges

### Tests for User Story 1 (REQUIRED)

- [x] T014 [P] [US1] Add parser unit tests in tests/unit/diceParser.test.ts
- [x] T015 [P] [US1] Add roller unit tests in tests/unit/diceRoller.test.ts
- [x] T016 [P] [US1] Add DiceService total tests in tests/unit/diceService.test.ts

### Implementation for User Story 1

- [x] T017 [P] [US1] Implement expression parser in src/services/diceService/parser.ts
- [x] T018 [P] [US1] Implement dice roller in src/services/diceService/roller.ts
- [x] T019 [US1] Implement DiceService evaluate flow in src/services/diceService/index.ts
- [x] T020 [US1] Implement roll handler in src/controllers/rollController.ts
- [x] T021 [US1] Wire /rolls route to controller in src/routes/rollRoutes.ts
- [x] T022 [US1] Verify OpenAPI base roll response in specs/001-dice-rolling-engine/contracts/dice-rolling.openapi.yaml

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - View Individual Rolls (Priority: P2)

**Goal**: Return each die roll and per-term totals for transparency

**Independent Test**: Submit "2d6+1d4+3" and verify roll details match the total

### Tests for User Story 2 (REQUIRED)

- [x] T023 [P] [US2] Add roll detail tests in tests/unit/diceRollDetails.test.ts

### Implementation for User Story 2

- [x] T024 [US2] Extend DiceService to include per-term rolls in src/services/diceService/index.ts
- [x] T025 [US2] Update roll controller response mapping in src/controllers/rollController.ts

**Checkpoint**: User Story 2 is functional and testable independently

---

## Phase 5: User Story 3 - Advantage and Disadvantage (Priority: P3)

**Goal**: Support advantage/disadvantage by rolling twice and selecting the correct total

**Independent Test**: Submit "1d20+5" with advantage or disadvantage and verify selection

### Tests for User Story 3 (REQUIRED)

- [x] T026 [P] [US3] Add advantage/disadvantage tests in tests/unit/diceAdvantage.test.ts

### Implementation for User Story 3

- [x] T027 [US3] Extend request validation for mode in src/validators/rollRequestSchema.ts
- [x] T028 [US3] Implement advantage/disadvantage selection in src/services/diceService/index.ts
- [x] T029 [US3] Update roll controller output for selectedIndex in src/controllers/rollController.ts
- [x] T030 [US3] Verify OpenAPI mode behavior in specs/001-dice-rolling-engine/contracts/dice-rolling.openapi.yaml

**Checkpoint**: User Story 3 is functional and testable independently

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T031 Add performance validation notes in specs/001-dice-rolling-engine/quickstart.md
- [x] T032 Add observability verification notes in specs/001-dice-rolling-engine/quickstart.md
- [x] T033 Add OpenAPI schema validation step in specs/001-dice-rolling-engine/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies - can start immediately
- Foundational (Phase 2): Depends on Setup completion - blocks all user stories
- User Stories (Phase 3+): All depend on Foundational phase completion
- Polish (Phase 6): Depends on all desired user stories being complete

### User Story Dependencies

- User Story 1 (P1): Can start after Foundational - no dependencies on other stories
- User Story 2 (P2): Can start after Foundational - depends on US1 results shape
- User Story 3 (P3): Can start after Foundational - depends on US1 service

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Parser/roller before service
- Service before controller/route wiring
- Story complete before moving to next priority

### Parallel Opportunities

- T003, T005, T006, T007, T008, T009 can run in parallel
- T014, T015, T016 can run in parallel
- T017 and T018 can run in parallel
- T023 and T026 can run in parallel

---

## Parallel Example: User Story 1

```bash
Task: "Add parser unit tests in tests/unit/diceParser.test.ts"
Task: "Add roller unit tests in tests/unit/diceRoller.test.ts"
Task: "Add DiceService total tests in tests/unit/diceService.test.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate User Story 1 independently

### Incremental Delivery

1. Foundation ready
2. Add User Story 1 -> test independently -> demo
3. Add User Story 2 -> test independently -> demo
4. Add User Story 3 -> test independently -> demo

### Parallel Team Strategy

1. Team completes Setup + Foundational together
2. Developer A: User Story 1
3. Developer B: User Story 2
4. Developer C: User Story 3

## Notes

- [P] tasks = different files, no dependencies
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Avoid vague tasks or cross-story coupling
