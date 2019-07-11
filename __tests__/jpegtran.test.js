"use strict";

const fs = require("fs");
const path = require("path");
const isJpg = require("is-jpg");
const isProgressive = require("is-progressive");
const pify = require("pify");
const m = require("../src/jpegtran");

const fsP = pify(fs);
// eslint-disable-next-line unicorn/prefer-exponentiation-operator
const infinityTimeout = Math.pow(2, 31) - 1;

describe("jpegtran", () => {
  it(
    "should optimize a JPG",
    async () => {
      const originalBuffer = await fsP.readFile(
        path.join(__dirname, "fixtures/fixture.jpg")
      );
      const compressedBuffer = await m()(originalBuffer);

      expect(compressedBuffer.length).toBeLessThan(originalBuffer.length);
      expect(isJpg(compressedBuffer)).toBe(true);
      expect(isProgressive.buffer(compressedBuffer)).toBe(true);
    },
    infinityTimeout
  );

  it(
    "should support options",
    async () => {
      const originalBuffer = await fsP.readFile(
        path.join(__dirname, "fixtures/fixture.jpg")
      );
      const compressedBuffer = await m()(originalBuffer);

      expect(isProgressive.buffer(compressedBuffer)).toBe(true);
    },
    infinityTimeout
  );

  it(
    "should skip optimizing a non-JPG file",
    async () => {
      const originalBuffer = await fsP.readFile(__filename);
      const compressedBuffer = await m()(originalBuffer);

      expect(compressedBuffer).toEqual(originalBuffer);
    },
    infinityTimeout
  );

  it(
    "throw error when a JPG is corrupt",
    async () => {
      expect.assertions(1);

      const originalBuffer = await fsP.readFile(
        path.join(__dirname, "fixtures/fixture-corrupt.jpg")
      );

      try {
        await m()(originalBuffer);
      } catch (error) {
        expect(error.message).toMatch(/Corrupt JPEG data/iu);
      }
    },
    infinityTimeout
  );
});
