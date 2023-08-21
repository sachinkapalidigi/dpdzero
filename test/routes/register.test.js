const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;

const server = require("../../src/app");
process.env.NODE_ENV = "test";

describe("verifies register flow with actual mysql connection", () => {
  const registerBody = {
    username: "test_user_1",
    email: "test_email@example.com",
    password: "Password@1",
    full_name: "Test User",
    age: 25,
    gender: "male",
  };

  it("successfull register", (done) => {
    chai
      .request(server)
      .post("/api/register")
      .send(registerBody)
      .end((err, res) => {
        expect(res.status).equal(201);
        expect(res.body.message).to.equal("User successfully registered!");
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("user_id");
        expect(res.body.data.username).to.equal(registerBody.username);
        expect(res.body.data.email).to.equal(registerBody.email);
        expect(res.body.data.age).to.equal(registerBody.age);
        expect(res.body.data.gender).to.equal(registerBody.gender);
        expect(res.body.data.full_name).to.equal(registerBody.full_name);
        done();
      });
  });

  it("register failure due to missing username", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    delete registerBodyCopy.username;
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("INVALID_REQUEST");
        expect(res.body.message).to.equal(
          "Invalid request. Please provide all required fields: username, email, password, full_name."
        );
        done();
      });
  });

  it("register failure due to missing password", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    delete registerBodyCopy.password;
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("INVALID_REQUEST");
        expect(res.body.message).to.equal(
          "Invalid request. Please provide all required fields: username, email, password, full_name."
        );
        done();
      });
  });

  it("register failure due to missing full name", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    delete registerBodyCopy.full_name;
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("INVALID_REQUEST");
        expect(res.body.message).to.equal(
          "Invalid request. Please provide all required fields: username, email, password, full_name."
        );
        done();
      });
  });

  it("register failure due to missing age", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    delete registerBodyCopy.age;
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("INVALID_AGE");
        expect(res.body.message).to.equal(
          "Invalid age value. Age must be a positive integer."
        );
        done();
      });
  });

  it("register failure due to missing gender", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    delete registerBodyCopy.gender;
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("GENDER_REQUIRED");
        expect(res.body.message).to.equal(
          "Gender field is required. Please specify the gender (e.g., male, female, non-binary)."
        );
        done();
      });
  });

  it("register failure due to missing email", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    delete registerBodyCopy.email;
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("INVALID_REQUEST");
        expect(res.body.message).to.equal(
          "Invalid request. Please provide all required fields: username, email, password, full_name."
        );
        done();
      });
  });

  it("register failure due to invalid password - length", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    registerBodyCopy.password = "Abc@3";
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("INVALID_PASSWORD");
        expect(res.body.message).to.equal(
          "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters."
        );
        done();
      });
  });

  it("register failure due to invalid password - weak password", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    registerBodyCopy.password = "weakpassword";
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("INVALID_PASSWORD");
        expect(res.body.message).to.equal(
          "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters."
        );
        done();
      });
  });

  it("register failure due to invalid age", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    registerBodyCopy.age = -100;
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("INVALID_AGE");
        expect(res.body.message).to.equal(
          "Invalid age value. Age must be a positive integer."
        );
        done();
      });
  });

  it("register failure due to invalid email", (done) => {
    const registerBodyCopy = {
      ...registerBody,
    };
    registerBodyCopy.email = "invalid_email";
    chai
      .request(server)
      .post("/api/register")
      .send(registerBodyCopy)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.status).to.equal("error");
        expect(res.body.code).to.equal("INVALID_REQUEST");
        expect(res.body.message).to.equal(
          "Invalid request. Please provide all required fields: username, email, password, full_name."
        );
        done();
      });
  });

  it("register failure due to existing email", (done) => {
    chai
      .request(server)
      .post("/api/register")
      .send(registerBody)
      .end((err, res) => {
        expect(res).to.have.status(201); // Expecting a successful registration
        // Now, try to register again with the same email
        const registerBodyCopy = {
          ...registerBody,
          username: "test_user_2",
        };
        chai
          .request(server)
          .post("/api/register")
          .send(registerBodyCopy)
          .end((err, res) => {
            expect(res).to.have.status(400); // Expecting a failure due to existing username
            expect(res.body).to.have.property("code");
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.equal("error");
            expect(res.body.code).to.equal("EMAIL_EXISTS");
            expect(res.body.message).to.equal(
              "The provided email is already registered. Please use a different email address."
            );
            done();
          });
      });
  });

  it("register failure due to existing username", (done) => {
    chai
      .request(server)
      .post("/api/register")
      .send(registerBody)
      .end((err, res) => {
        expect(res).to.have.status(201); // Expecting a successful registration
        // Now, try to register again with the same username
        const registerBodyCopy = {
          ...registerBody,
          email: "test_user_2@example.com",
        };
        chai
          .request(server)
          .post("/api/register")
          .send(registerBodyCopy)
          .end((err, res) => {
            expect(res).to.have.status(400); // Expecting a failure due to existing username
            expect(res.body).to.have.property("code");
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.equal("error");
            expect(res.body.code).to.equal("USERNAME_EXISTS");
            expect(res.body.message).to.equal(
              "The provided username is already taken. Please choose a different username."
            );
            done();
          });
      });
  });
});
