const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;

const server = require("../../src/app");
process.env.NODE_ENV = "test";

describe("verifies data storage flow with actual mysql connection", () => {
  const registerBody = {
    username: "test_user_1",
    email: "test_email@example.com",
    password: "Password@1",
    full_name: "Test User",
    age: 25,
    gender: "male",
  };

  const registerUser = (requestBody) =>
    new Promise((resolve, reject) => {
      chai
        .request(server)
        .post("/api/register")
        .send(requestBody)
        .end((err, res) => {
          if (err) reject(err);
          resolve(res);
        });
    });

  const loginUser = (requestBody) =>
    new Promise((resolve, reject) => {
      chai
        .request(server)
        .post("/api/token")
        .send(requestBody)
        .end((err, res) => {
          if (err) reject(err);
          resolve(res);
        });
    });

  it("Store data successfull", (done) => {
    registerUser(registerBody).then(() => {
      loginUser({
        username: registerBody.username,
        password: registerBody.password,
      }).then((loginResponse) => {
        chai
          .request(server)
          .post("/api/data")
          .auth(loginResponse.body.data.access_token, { type: "bearer" })
          .send({
            key: "my test key",
            value: "my test value",
          })
          .end((err, res) => {
            expect(res.status).equal(201);
            expect(res.body.message).to.equal("Data stored successfully.");
            done();
          });
      });
    });
  });
});

// TODO: test retrieval of data

// TODO: test update of data

// TODO: test deletion of data
