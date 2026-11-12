import test from "node:test";
import assert from "node:assert/strict";
import { irMessages, irPalettes, nextIndex } from "../src/data/irMessages.js";

test("every alternative is reachable without repeating the previous message or palette", () => {
  for (const entries of [irMessages, irPalettes]) {
    for (let previous = 0; previous < entries.length; previous++) {
      const results = new Set();
      for (let slot = 0; slot < entries.length - 1; slot++) {
        const next = nextIndex(previous, entries.length, () => (slot + .5) / (entries.length - 1));
        assert.notEqual(next, previous);
        assert.ok(next >= 0 && next < entries.length);
        results.add(next);
      }
      assert.equal(results.size, entries.length - 1);
    }
  }
});

test("all palettes provide sufficient text contrast against the terminal ink", () => {
  const luminance = (hex) => {
    const channels = hex.slice(1).match(/../g).map((part) => parseInt(part, 16) / 255)
      .map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  for (const palette of irPalettes) {
    for (const color of [palette.background, palette.accent]) {
      assert.ok((luminance(color) + .05) / (luminance("#101010") + .05) >= 4.5);
    }
  }
});
