const assert = require("assert");
const fs = require("fs");
const configDir = require("../src/util/configDir");

describe("Local templates directory Tests", () => {
  it("Hidden config directory should exist", () => {
    assert.equal(fs.existsSync(configDir), true);
  });
  it("Local templates directory to exist", () => {
    assert.equal(fs.existsSync(`${configDir}/templates`), true);
  });
  it("Local templates directory to not be empty", () => {
    assert.equal(fs.readdirSync(`${configDir}/templates`).length > 0, true);
  })
});
