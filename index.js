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
    // Use `dice` to get simulate the throw of the dice.
    // Attacker throw first dice, then the defender, then attacker again and so on.
    if (attack === 0 || attack > 3) {
      throw new Error("Attacker invalid unit: '" + attack + "'.");
    }

    if (defense === 0 || defense > 3) {
      throw new Error("Defender invalid unit: '" + defense + "'.");
    }

    const attackDices = [];
    const defenseDices = [];

    for (let index = 0; index < attack + defense; index++) {
      if (index % 2) {
        if (defenseDices.length < defense) {
          defenseDices.push(dice());
        } else {
          attackDices.push(dice());
        }
      } else {
        if (attackDices.length < attack) {
          attackDices.push(dice());
        } else {
          defenseDices.push(dice());
        }
      }
    }

    attackDices.sort((a, b) => b - a);
    defenseDices.sort((a, b) => b - a);
    let lostAttack = 0;
    let lostDefense = 0;
    for (let index = 0; index < Math.min(defenseDices.length, attackDices.length); index++) {
      if (defenseDices[index] >= attackDices[index]) {
        lostAttack = lostAttack + 1;
      } else {
        lostDefense = lostDefense + 1;
      }
    }
    const result = [lostAttack, lostDefense];

    return { attack: attackDices, defense: defenseDices, result: result };
  };

module.exports = battle;

/**
 * @typedef Output
 * @property {number[]} attack - Attacker's dice result, eg. [5, 4, 2]
 * @property {number[]} defense - Defender's dice result, eg. [4, 3, 2]
 * @property {number[]} result - How many tanks each parties loses, eg. [1, 2]
 */
