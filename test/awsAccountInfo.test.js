const assert = require("assert");
const { accountNumber, region } = require("../src/util/awsAccountInfo.js");
const AWSRegions = require("../src/config/AWSRegions.js");

describe("AWS Account info tests", () => {
  describe("accountNumber Tests", () => {
    const accountNumberFormatRegex = /\d{12}/;
    it("accountNumber should be configured", () => {
      assert(accountNumber, "AWS accountNumber is not configured.");
    });
    it("accountNumber should be 12 digits", () => {
      assert.equal(accountNumberFormatRegex.test(accountNumber), true);
    });
  });

  describe("AWS region Tests", () => {
    it("AWS region should be configured", () => {
      assert(region, "AWS region is not configured");
    });
    it("AWS region is valid", () => {
      assert.equal(AWSRegions.includes(region), true);
    });
  });
});
