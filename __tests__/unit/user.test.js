const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");
const bcrypt = require("bcryptjs");
const factory = require("../factories");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt password hash", async () => {
    const user = await factory.create("User");

    const compared = await bcrypt.compare(user.password, user.password_hash);

    expect(compared).toBe(true);
  });
});
