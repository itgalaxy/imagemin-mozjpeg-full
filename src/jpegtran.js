"use strict";

const execBuffer = require("exec-buffer");
const isJpg = require("is-jpg");
const mozjpegBinaries = require("mozjpeg-binaries");

module.exports = opts => async buf => {
  const options = Object.assign({}, opts);

  if (!Buffer.isBuffer(buf)) {
    throw new TypeError("Expected a buffer");
  }

  if (!isJpg(buf)) {
    return Promise.resolve(buf);
  }

  const args = ["-copy", "none"];

  if (options.revert) {
    args.push("-revert");
  }

  if (options.progressive) {
    args.push("-progressive");
  }

  if (options.arithmetic) {
    args.push("-arithmetic");
  } else {
    args.push("-optimize");
  }

  args.push("-outfile", execBuffer.output, execBuffer.input);

  // eslint-disable-next-line init-declarations
  let buffer;

  try {
    buffer = await execBuffer({
      args,
      bin: mozjpegBinaries.jpegtran,
      input: buf
    });
  } catch (error) {
    error.message = error.stderr || error.message;

    throw error;
  }

  return buffer;
};
