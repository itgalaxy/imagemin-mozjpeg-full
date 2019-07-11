"use strict";

const plugins = require("../src");

describe("binaries", () => {
  it("should be exported", () => {
    const pluginNames = Object.keys(plugins);

    expect(pluginNames).toContain("cjpeg");
    expect(pluginNames).toContain("jpegtran");
  });

  // { plugins: ["mozjpeg-full/cjpeg", "mozjpeg-full/jpegtran"] }
  it("should be exists to allow using `require`/`import` in configurations", () => {
    // eslint-disable-next-line global-require
    const cjpeg = require("../cjpeg");
    // eslint-disable-next-line global-require
    const jpegtran = require("../jpegtran");

    expect(typeof cjpeg).toBe("function");
    expect(typeof jpegtran).toBe("function");
  });
});
