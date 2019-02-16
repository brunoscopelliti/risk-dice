"use strict";

const MersenneTwister = require("mersenne-twister");
const generator = new MersenneTwister();

/**
 * Simulates dice result
 * @name dice
 * @return {Number}
 */
const dice =
  () => Math.floor(generator.random() * 6) + 1;

/**
 * @name battle
 * @param {Number} attack
 * @param {Number} defense
 * @return {Output} obj
 */
const battle =
  (attack, defense) => {
    // TODO Use `dice` to get simulate the throw of the dice.
    // Attacker throw first dice, then the defender, then attacker again and so on.

    throw new Error("Not implemented.");
  };

module.exports = battle;

/**
 * @typedef Output
 * @property {number[]} attack - Attacker's dice result, eg. [5, 4, 2]
 * @property {number[]} defense - Defender's dice result, eg. [4, 3, 2]
 * @property {number[]} result - How many tanks each parties loses, eg. [1, 2]
 */
