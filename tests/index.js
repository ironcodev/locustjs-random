import Random, { RandomType } from "../index.esm.js";
import { isSomeString } from '@locustjs/base';
import TestRunner from "@locustjs/test";

const isAlpha = (x) => isSomeString(x) && x.match(/^[a-z]+$/i) !== null;
const isAlphaNum = (x) => isSomeString(x) && x.match(/^[a-z0-9]+$/i) !== null;
const isDigit = (x) => isSomeString(x) && x.match(/^[0-9]+$/) !== null;
const isLower = (x) => isSomeString(x) && x.match(/^[a-z]+$/) !== null;
const isUpper = (x) => isSomeString(x) && x.match(/^[A-Z]+$/) !== null;

const tests = [
  [
    "Random: next",
    function (expect) {
      const n = Random.next(0, 10);

      expect(n)
        .toBeDefined()
        .toBeNumeric()
        .toBeString()
        .toBeGte(0)
        .toBeLt(10);

      for (let ch of n.toString()) {
        expect(ch).toBeValid(isDigit)
      }
    },
  ],
  [
    "Random: generate num",
    function (expect) {
      const n = Random.generate({ len: 10 });

      expect(n).toBeDefined();
      expect(n.length).toBe(10).toBeGte(10);
    },
  ],
  [
    "Random: generate num without zero",
    function (expect) {
      for (let i = 0; i < 100; i++) {
        const n = Random.generate({ excludes: ['0'] });
  
        for (let ch of n) {
          expect(ch).toBeValid(x => x != '0')
        }
      }
    },
  ],
  [
    "Random: generate alpha",
    function (expect) {
      const n = Random.generate({ len: 10, type: RandomType.alpha });

      expect(n).toBeDefined();
      expect(n.toString().length).toBe(10);

      for (let ch of n.toString()) {
        expect(ch).toBeValid(isAlpha)
      }
    },
  ],
  [
    "Random: generate alphaNum",
    function (expect) {
      const n = Random.generate({ len: 10, type: RandomType.alphaNum });

      expect(n).toBeDefined();
      expect(n.toString().length).toBe(10);

      for (let ch of n.toString()) {
        expect(ch).toBeValid(isAlphaNum)
      }
    },
  ],
  [
    "Random: upper",
    function (expect) {
      const n = Random.generate({ len: 10, type: RandomType.upper });

      expect(n).toBeDefined();
      expect(n.length).toBe(10);

      for (let ch of n) {
        expect(ch.charCodeAt(0)).toBeBetween(65, 91)
      }
    },
  ],
  [
    "Random: lower",
    function (expect) {
      const n = Random.generate({ len: 10, type: RandomType.lower });

      expect(n).toBeDefined();
      expect(n.length).toBe(10);

      for (let ch of n) {
        expect(ch.charCodeAt(0)).toBeBetween(97, 123)
      }
    },
  ],
  [
    "Random: upperNum",
    function (expect) {
      const n = Random.generate({ len: 10, type: RandomType.upperNum });

      expect(n).toBeDefined();
      expect(n.length).toBe(10);

      for (let ch of n) {
        expect(ch).toBeValid(isAlphaNum).toBeValid(x => isUpper(x) || isDigit(x));
      }
    },
  ],
  [
    "Random: lowerNum",
    function (expect) {
      const n = Random.generate({ len: 10, type: RandomType.lowerNum });

      expect(n).toBeDefined();
      expect(n.length).toBe(10);

      for (let ch of n) {
        expect(ch).toBeValid(isAlphaNum).toBeValid(x => isLower(x) || isDigit(x));
      }
    },
  ],
  [
    "Random: custom",
    function (expect) {
      const chars = ['1', '3', '5', '7', '9']
      const n = Random.generate({ type: RandomType.custom, chars });

      expect(n).toBeDefined();

      for (let ch of n) {
        expect(ch).toBeValid(x => chars.indexOf(x) >= 0);
      }
    },
  ]
];

const runner = new TestRunner();

runner.run(tests).then((result) => {
  runner.report(result.failed > 0);
});
