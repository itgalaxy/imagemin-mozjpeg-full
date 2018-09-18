"use strict";

const fs = require("fs");
const path = require("path");
const isJpg = require("is-jpg");
const isProgressive = require("is-progressive");
const pify = require("pify");
const m = require("../src/cjpeg");

const fsP = pify(fs);
// eslint-disable-next-line unicorn/prefer-exponentiation-operator
const infinityTimeout = Math.pow(2, 31) - 1;

describe("cjpeg", () => {
  it(
    "should optimize a JPG",
    () => {
      let originalBuffer = null;

      return fsP
        .readFile(path.join(__dirname, "fixtures/fixture.jpg"))
        .then(buffer => {
          originalBuffer = buffer;

          return m()(originalBuffer);
        })
        .then(compressedBuffer => {
          expect(compressedBuffer.length).toBeLessThan(originalBuffer.length);
          expect(isJpg(compressedBuffer)).toBe(true);
          expect(isProgressive.buffer(compressedBuffer)).toBe(true);

          return compressedBuffer;
        });
    },
    infinityTimeout
  );

  it(
    "should support options",
    () =>
      fsP
        .readFile(path.join(__dirname, "fixtures/fixture.jpg"))
        .then(buffer => m({ progressive: false })(buffer))
        .then(compressedBuffer => {
          expect(isProgressive.buffer(compressedBuffer)).toBe(false);

          return compressedBuffer;
        }),
    infinityTimeout
  );

  it(
    "should skip optimizing a non-JPG file",
    () => {
      let originalBuffer = null;

      return fsP
        .readFile(__filename)
        .then(buffer => {
          originalBuffer = buffer;

          return m()(buffer);
        })
        .then(compressedBuffer => {
          expect(compressedBuffer).toEqual(originalBuffer);

          return compressedBuffer;
        });
    },
    infinityTimeout
  );

  it(
    "throw error when a JPG is corrupt",
    () =>
      fsP
        .readFile(path.join(__dirname, "fixtures/fixture-corrupt.jpg"))
        .then(buffer => m()(buffer))
        .catch(error => {
          expect(error.message).toMatch(/Corrupt JPEG data/iu);
        }),
    infinityTimeout
  );
});
