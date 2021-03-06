"use strict";

const execa = require("execa");
const isJpg = require("is-jpg");
const mozjpegBinaries = require("mozjpeg-binaries");

// eslint-disable-next-line complexity
module.exports = opts => async buffer => {
  const options = Object.assign(
    {
      overshoot: true,
      trellis: true,
      trellisDC: true
    },
    opts
  );

  if (!Buffer.isBuffer(buffer)) {
    throw new TypeError("Expected a buffer");
  }

  if (!isJpg(buffer)) {
    return Promise.resolve(buffer);
  }

  const args = [];

  if (typeof options.quality !== "undefined") {
    args.push("-quality", options.quality);
  }

  if (options.progressive === false) {
    args.push("-baseline");
  }

  if (options.targa) {
    args.push("-targa");
  }

  if (options.revert) {
    args.push("-revert");
  }

  if (options.fastCrush) {
    args.push("-fastcrush");
  }

  if (typeof options.dcScanOpt !== "undefined") {
    args.push("-dc-scan-opt", options.dcScanOpt);
  }

  if (!options.trellis) {
    args.push("-notrellis");
  }

  if (!options.trellisDC) {
    args.push("-notrellis-dc");
  }

  if (options.tune) {
    args.push(`-tune-${options.tune}`);
  }

  if (!options.overshoot) {
    args.push("-noovershoot");
  }

  if (options.arithmetic) {
    args.push("-arithmetic");
  }

  if (options.dct) {
    args.push("-dct", options.dct);
  }

  if (options.quantBaseline) {
    args.push("-quant-baseline", options.quantBaseline);
  }

  if (typeof options.quantTable !== "undefined") {
    args.push("-quant-table", options.quantTable);
  }

  if (options.smooth) {
    args.push("-smooth", options.smooth);
  }

  if (options.maxMemory) {
    args.push("-maxmemory", options.maxMemory);
  }

  if (options.sample) {
    args.push("-sample", options.sample.join(","));
  }

  // eslint-disable-next-line init-declarations
  let stdout;

  try {
    ({ stdout } = await execa(mozjpegBinaries.cjpeg, args, {
      encoding: null,
      input: buffer,
      maxBuffer: Infinity
    }));
  } catch (error) {
    if (error.stderr) {
      error.message += `\n${error.stderr.toString()}`;
    }

    throw error;
  }

  return stdout;
};
