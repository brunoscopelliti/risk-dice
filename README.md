# risk-dice

Computes wins/loses of a risk dice match.

## Install

```bash
npm install risk-dice-simulator
```

## Rules

Each dice is compared in order of magnitude,
that is the greatest attacker's value against the greatest defender's value, and so on.

In case of draw, defender wins.

## Usage

```js
const battle = require("risk-dice-simulator");

const { result, attack, defense } = battle(/* attackerUnits */ 3, /* defenterUnits */ 2);

// `attack` contains attacker's dice result, eg. [6, 5, 2].
// `defense` contains defender's dice result, eg. [6, 4].
// `result` contains how many tanks each parties loses, eg. [1, 1].
```
