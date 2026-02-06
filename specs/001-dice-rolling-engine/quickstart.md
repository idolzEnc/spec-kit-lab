# Quickstart: Dice Rolling API

## Prerequisites

- Node.js 20 LTS
- PostgreSQL 15+

## Environment

- `DATABASE_URL` (PostgreSQL connection string)
- `PORT` (optional, default 3000)

## Install

```bash
npm install
```

## Database

```bash
npx prisma migrate dev
```

## Run

```bash
npm run dev
```

## Validation

### Performance

- Measure the /rolls endpoint and confirm p95 < 200ms under normal load.

### Observability

- Confirm logs include x-correlation-id and roll_created events.

### OpenAPI

- Validate the contract in specs/001-dice-rolling-engine/contracts/dice-rolling.openapi.yaml
  using an OpenAPI 3.0.1 validator.

## Example Request

```bash
curl -X POST http://localhost:3000/rolls \
  -H "Content-Type: application/json" \
  -d '{"expression":"2d6+1d4+3","mode":"normal"}'
```

## Example Response

```json
{
  "expression": "2d6+1d4+3",
  "mode": "normal",
  "rollSets": [
    {
      "total": 12,
      "terms": [
        { "term": "2d6", "rolls": [3, 5], "termTotal": 8 },
        { "term": "1d4", "rolls": [1], "termTotal": 1 },
        { "term": "3", "rolls": [], "termTotal": 3 }
      ]
    }
  ],
  "selectedIndex": 0,
  "total": 12
}
```
