const { factory } = require("factory-girl");
const { User } = require("../src/app/models");
const { faker } = require("@faker-js/faker");

factory.define("User", User, {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

module.exports = factory;
