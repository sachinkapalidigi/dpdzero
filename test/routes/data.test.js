const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;

const server = require("../../src/app");
process.env.NODE_ENV = "test";

// COMMON VARS
const registerBody = {
  username: "test_user_1",
  email: "test_email@example.com",
  password: "Password@1",
  full_name: "Test User",
  age: 25,
  gender: "male",
};
const loginBody = {
  username: registerBody.username,
  password: registerBody.password,
};
let token;
const dataBody = {
  key: "my test key",
  value: "my test value",
};

describe("verifies data storage flow with actual mysql connection", () => {
  // Register new user and login before each test
  beforeEach((done) => {
    chai
      .request(server)
      .post("/api/register")
      .send(registerBody)
      .end((registerErr, registerResponse) => {
        chai
          .request(server)
          .post("/api/token")
          .send(loginBody)
          .end((loginErr, loginResponse) => {
            token = loginResponse.body.data.access_token;
            done();
          });
      });
  });

  it("Store data successfull", (done) => {
    chai
      .request(server)
      .post("/api/data")
      .auth(token, { type: "bearer" })
      .send(dataBody)
      .end((err, res) => {
        expect(res.status).equal(201);
        expect(res.body.message).to.equal("Data stored successfully.");
        done();
      });
  });

  // Store data error: missing key
  it("Store data error: missing key", (done) => {
    chai
      .request(server)
      .post("/api/data")
      .auth(token, { type: "bearer" })
      .send({
        value: dataBody.value,
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(
          "The provided key is not valid or missing."
        );
        expect(res.body.code).to.equal("INVALID_KEY");
        done();
      });
  });

  // Store data error: missing value
  it("Store data error: missing value", (done) => {
    chai
      .request(server)
      .post("/api/data")
      .auth(token, { type: "bearer" })
      .send({
        key: `${dataBody.key} ${Date.now().toString()}`,
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(
          "The provided value is not valid or missing."
        );
        expect(res.body.code).to.equal("INVALID_VALUE");
        done();
      });
  });

  // Store data error: key exists
  it("Store data error: key exists", (done) => {
    // Success request
    chai
      .request(server)
      .post("/api/data")
      .auth(token, { type: "bearer" })
      .send(dataBody)
      .end((err, res) => {
        // Failure request when retried
        chai
          .request(server)
          .post("/api/data")
          .auth(token, { type: "bearer" })
          .send(dataBody)
          .end((err, res) => {
            expect(res.status).equal(400);
            expect(res.body).to.have.property("status");
            expect(res.body).to.have.property("code");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(
              "The provided key already exists in the database. To update an existing key, use the update API."
            );
            expect(res.body.code).to.equal("KEY_EXISTS");
            done();
          });
      });
  });

  // Store data error: Invalid token
  it("Store data error: Invalid token", (done) => {
    chai
      .request(server)
      .post("/api/data")
      // .auth(token, { type: "bearer" })
      .send(dataBody)
      .end((err, res) => {
        expect(res.status).equal(401);
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body.code).to.equal("INVALID_TOKEN");
        expect(res.body.message).to.equal("Invalid access token provided.");
        done();
      });
  });
});

describe("verifies data retrieval flow with actual mysql connection", () => {
  // Register new user and login before each test
  beforeEach((done) => {
    chai
      .request(server)
      .post("/api/register")
      .send(registerBody)
      .end((registerErr, registerResponse) => {
        chai
          .request(server)
          .post("/api/token")
          .send(loginBody)
          .end((loginErr, loginResponse) => {
            token = loginResponse.body.data.access_token;
            done();
          });
      });
  });

  // Save data to retrieve before each test
  beforeEach((done) => {
    chai
      .request(server)
      .post("/api/data")
      .auth(token, { type: "bearer" })
      .send(dataBody)
      .end((err, res) => {
        done();
      });
  });

  it("Retrieve data successfull", (done) => {
    chai
      .request(server)
      .get(`/api/data/${dataBody.key}`)
      .auth(token, { type: "bearer" })
      .send()
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("key");
        expect(res.body.data).to.have.property("value");
        expect(res.body.data.key).to.equal(dataBody.key);
        expect(res.body.data.value).to.equal(dataBody.value);
        done();
      });
  });

  // TODO: Retrieve data error: key not found

  // TODO: Retrieve data error: value not found
});

// TODO: test update of data

// TODO: test deletion of data
