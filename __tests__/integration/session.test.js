const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });

  it("should not authenticate with a INVALID credential", async () => {
    const user = await factory.create("User", {
      password: "123456",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "00000", //needs to be different
    });

    expect(response.status).toBe(401);
  });

  it("should return a token", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: user.password,
    });

    expect(response.body).toHaveProperty("token");
  });

  it("should should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should should NOT be able to access private routes whitout jwt token", async () => {
    const user = await factory.create("User");

    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it("should should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer 000000`);

    expect(response.status).toBe(401);
  });
});
