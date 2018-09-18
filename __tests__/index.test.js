"use strict";

const plugins = require("../src");

describe("plugins", () => {
  it("should be exported", () => {
    const pluginNames = Object.keys(plugins);

    expect(pluginNames).toContain("cjpeg");
    expect(pluginNames).toContain("jpegtran");
  });
});
