const assert = require("assert");
const { accountNumber, region } = require("../src/util/awsAccountInfo.js");

describe("awsAccountInfo.js tests", () => {
  describe("accountNumber Tests", () => {
    const accountNumberFormatRegex = /\d{12}/;
    it("accountNumber should be configured", () => {
      assert(accountNumber, "accountNumber is configured.");
    });
    it("accountNumber should be 12 digits", () => {
      assert.equal(accountNumberFormatRegex.test(accountNumber), true);
    });
  });
});
