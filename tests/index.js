/* eslint-env jest */

"use strict";

jest.mock("mersenne-twister");

const MersenneTwister = require("mersenne-twister");

const battle = require("../index.js");

describe("invalid battle", () => {
  it("throws", () => {
    expect(
      function () {
        battle(0, 1);
      }
    ).toThrow("Attacker invalid unit: '" + 0 + "'.");
  });

  it("throws / 2", () => {
    expect(
      function () {
        battle(4, 1);
      }
    ).toThrow("Attacker invalid unit: '" + 4 + "'.");
  });

  it("throws / 3", () => {
    expect(
      function () {
        battle(2, 0);
      }
    ).toThrow("Defender invalid unit: '" + 0 + "'.");
  });

  it("throws / 4", () => {
    expect(
      function () {
        battle(2, 4);
      }
    ).toThrow("Defender invalid unit: '" + 4 + "'.");
  });
});

describe("battles", () => {
  // This maps the values generator.random
  // should output in order to generate a particular dice result.
  // Eg. If `generator.random` returns 0.4, the dice result is 3.
  const values = new Map([
    [1, 0],
    [2, 0.2],
    [3, 0.4],
    [4, 0.5],
    [5, 0.7],
    [6, 0.9],
  ]);

  // So:
  // `MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));`
  // force the dice to return 2.

  beforeEach(
    () => {
      MersenneTwister.prototype.random.mockRestore();
    }
  );

  test("3 vs 1 - attack win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2)); // Attack
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2)); // Defense
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1)); // Attack
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4)); // Attack

    expect(
      battle(3, 1)
    ).toBe({
      attack: [4, 2, 1],
      defense: [2],
      result: [0, 1],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(4);
  });

  test("3 vs 1 - defense win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));

    expect(
      battle(3, 1)
    ).toBe({
      attack: [3, 2, 2],
      defense: [3],
      result: [1, 0],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(4);
  });

  test("3 vs 2 - attack win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));

    expect(
      battle(3, 2)
    ).toBe({
      attack: [4, 3, 1],
      defense: [3, 2],
      result: [0, 2],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(5);
  });

  test("3 vs 2 - draw", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(6));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(6));

    expect(
      battle(3, 2)
    ).toBe({
      attack: [6, 3, 3],
      defense: [6, 2],
      result: [1, 1],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(5);
  });

  test("3 vs 2 - defense win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(6));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(6));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));

    expect(
      battle(3, 2)
    ).toBe({
      attack: [6, 2, 2],
      defense: [6, 4],
      result: [2, 0],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(5);
  });

  test("3 vs 3 - attack win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));

    expect(
      battle(3, 3)
    ).toBe({
      attack: [5, 5, 2],
      defense: [4, 3, 1],
      result: [0, 3],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(6);
  });

  test("3 vs 3 - attack win two, but lose one", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));

    expect(
      battle(3, 3)
    ).toBe({
      attack: [5, 5, 2],
      defense: [4, 4, 4],
      result: [1, 2],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(6);
  });

  test("3 vs 3 - defense win two, but lose one", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));

    expect(
      battle(3, 3)
    ).toBe({
      attack: [3, 2, 2],
      defense: [5, 4, 1],
      result: [2, 1],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(6);
  });

  test("3 vs 3 - defense win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(6));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(6));

    expect(
      battle(3, 3)
    ).toBe({
      attack: [6, 3, 3],
      defense: [6, 4, 3],
      result: [3, 0],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(6);
  });

  test("2 vs 3 - attack win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));

    expect(
      battle(2, 3)
    ).toBe({
      attack: [5, 4],
      defense: [4, 3, 3],
      result: [0, 2],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(5);
  });

  test("2 vs 3 - draw", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));

    expect(
      battle(2, 3)
    ).toBe({
      attack: [4, 1],
      defense: [3, 2, 2],
      result: [1, 1],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(5);
  });

  test("2 vs 3 - defense win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));

    expect(
      battle(2, 3)
    ).toBe({
      attack: [2, 2],
      defense: [3, 3, 1],
      result: [2, 0],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(5);
  });

  test("1 vs 3 - attack win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));

    expect(
      battle(1, 3)
    ).toBe({
      attack: [4],
      defense: [3, 3, 2],
      result: [0, 1],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(4);
  });

  test("1 vs 3 - defense win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));

    expect(
      battle(1, 3)
    ).toBe({
      attack: [5],
      defense: [5, 1, 1],
      result: [1, 0],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(4);
  });

  test("2 vs 1 - attack win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));

    expect(
      battle(2, 1)
    ).toBe({
      attack: [5, 1],
      defense: [2],
      result: [0, 1],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(3);
  });

  test("2 vs 1 - defense win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(6));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));

    expect(
      battle(2, 1)
    ).toBe({
      attack: [5, 1],
      defense: [6],
      result: [1, 0],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(3);
  });

  test("2 vs 2 - attack win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));

    expect(
      battle(2, 2)
    ).toBe({
      attack: [5, 2],
      defense: [4, 1],
      result: [0, 2],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(4);
  });

  test("2 vs 2 - draw", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(6));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));

    expect(
      battle(2, 2)
    ).toBe({
      attack: [6, 2],
      defense: [5, 4],
      result: [1, 1],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(4);
  });

  test("2 vs 2 - defense win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));

    expect(
      battle(2, 2)
    ).toBe({
      attack: [4, 2],
      defense: [5, 2],
      result: [2, 0],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(4);
  });

  test("1 vs 2 - attack win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(5));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));

    expect(
      battle(1, 2)
    ).toBe({
      attack: [5],
      defense: [4, 2],
      result: [0, 1],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(3);
  });

  test("1 vs 2 - defense win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(3));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(4));

    expect(
      battle(1, 2)
    ).toBe({
      attack: [3],
      defense: [4, 2],
      result: [1, 0],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(3);
  });

  test("1 vs 1 - attack win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(2));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));

    expect(
      battle(1, 1)
    ).toBe({
      attack: [2],
      defense: [1],
      result: [0, 1],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(2);
  });

  test("1 vs 1 - defense win", () => {
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));
    MersenneTwister.prototype.random.mockReturnValueOnce(values.get(1));

    expect(
      battle(1, 1)
    ).toBe({
      attack: [1],
      defense: [1],
      result: [1, 0],
    });

    expect(
      MersenneTwister.prototype.random
    ).toHaveBeenCalledTimes(2);
  });
});
