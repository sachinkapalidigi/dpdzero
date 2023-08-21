const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;

const server = require("../../src/app");
process.env.NODE_ENV = "test";

describe("verifies token generation flow with actual mysql connection", () => {
  const registerBody = {
    username: "test_user_1",
    email: "test_email@example.com",
    password: "Password@1",
    full_name: "Test User",
    age: 25,
    gender: "male",
  };

  const registerUser = () =>
    new Promise((resolve, reject) => {
      chai
        .request(server)
        .post("/api/register")
        .send(registerBody)
        .end((err, res) => {
          if (err) reject(err);
          resolve(res);
        });
    });

  it("Generate token successfully", (done) => {
    registerUser().then((registerResponse) => {
      chai
        .request(server)
        .post("/api/token")
        .send({
          username: registerBody.username,
          password: registerBody.password,
        })
        .end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body.message).to.equal(
            "Access token generated successfully."
          );
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("access_token");
          expect(res.body.data).to.have.property("expires_in");
          done();
        });
    });
  });
});
