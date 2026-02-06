# Data Model: Dice Rolling Engine

## Domain Entities (Transient)

### DiceExpression

- **Fields**: `rawExpression` (string), `mode` (normal|advantage|disadvantage),
  `terms` (DiceTerm[])
- **Validation**: non-empty, must match expression regex, <= 20 terms

### DiceTerm

- **Fields**: `kind` (dice|const), `sign` (+1|-1), `count` (int),
  `sides` (int), `value` (int)
- **Validation**: for dice terms, `count >= 1`, `sides >= 1`, `sides <= 1000`

### RollSet

- **Fields**: `terms` (RollTerm[]), `total` (int)
- **Validation**: total is sum of term totals, each term is derived from input

### RollTerm

- **Fields**: `term` (DiceTerm), `rolls` (int[]), `termTotal` (int)
- **Validation**: `rolls.length` equals `count` for dice terms

### RollResult

- **Fields**: `expression` (string), `mode` (string), `rollSets` (RollSet[]),
  `selectedIndex` (int), `total` (int)
- **Validation**: `rollSets.length` is 1 for normal, 2 for advantage/disadvantage

## Persistence (Internal Audit)

### RollAudit

- **Fields**: `id` (uuid), `expression` (string), `mode` (string),
  `rollSets` (json), `selectedIndex` (int), `total` (int),
  `createdAt` (timestamp)
- **Validation**: mirrors `RollResult` validation rules
- **Notes**: Stored for observability only, not exposed in public API.

## Relationships

- `DiceExpression` contains many `DiceTerm` items.
- `RollSet` contains many `RollTerm` items derived from `DiceExpression` terms.
- `RollResult` contains one or two `RollSet` entries depending on mode.

## State Transitions

- `DiceExpression` (validated) -> `RollResult`
- `RollResult` -> `RollAudit` (optional internal persistence)
