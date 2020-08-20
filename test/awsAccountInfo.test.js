const assert = require("assert");
const { accountNumber, region } = require("../src/util/awsAccountInfo.js");

describe( "awsAccountInfo.js tests", () => {
  describe("accountNumber Tests", () => {
    it("accountNumber should be configured", ()=> {
      assert(accountNumber, "accountNumber is configured.");
    });
  })
});
