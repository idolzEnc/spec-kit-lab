# Research: Dice Rolling Engine

## Decision 1: Layered API Structure (Controllers/Services/Repositories)

**Decision**: Use controllers for HTTP handling, services for dice logic, and a
repository for any Prisma access.

**Rationale**: This keeps controllers thin, makes dice logic unit-testable, and
allows repository mocking for fast Jest tests. It also keeps Prisma errors from
leaking into API responses.

**Alternatives considered**: Monolithic controller logic; direct Prisma calls in
controllers.

## Decision 2: Regex-Based Parsing (Lexer + Term Parsing)

**Decision**: Validate the whole expression with a strict regex, tokenize with
`/[+-]?(?:\d+d\d+|\d+)/g`, and parse each token into dice or constant terms.

**Rationale**: This approach avoids heavy parser generators, enforces strict
syntax (rejects `d20`, `2dd6`, trailing operators), and supports signed terms
without ambiguous split logic.

**Alternatives considered**: Handwritten recursive descent parser; permissive
parser that accepts `d20` or other shorthand.

## Decision 3: Cryptographically Secure RNG

**Decision**: Use Node's built-in `crypto.randomInt()` for all dice rolls.

**Rationale**: `randomInt()` is CSPRNG-backed and avoids modulo bias, producing
fair results without custom seeding or external dependencies.

**Alternatives considered**: `Math.random()`; manual `randomBytes()` modulo
mapping.

## Decision 4: Prisma + PostgreSQL for Internal Audit Storage

**Decision**: Use Prisma with PostgreSQL for internal roll audit records only,
without exposing persistence via public endpoints.

**Rationale**: This satisfies the Prisma/PostgreSQL constraint while preserving
stateless behavior for clients. Audit records can support observability without
adding user-facing complexity.

**Alternatives considered**: No persistence; in-memory logging only.
