import { STATUS } from "../src/interfaces/common/http";
import chaiHttp from "chai-http";
import { expect } from "chai";
import dotenv from "dotenv";
import chai from "chai";

dotenv.config();

const server = process.env.SERVER_URL;

chai.use(chaiHttp);

const user = {
  email: "user@test.new",
  username: "testUser",
  password: "password",
  id: undefined,
};

const newUser = {
  id: user.id,
  email: "user@test.new",
  username: "noMoreATestUser",
  password: "password",
};

describe("Clear database", () => {
  it("should be able to clear database", (done) => {
    chai
      .request(server)
      .delete("/users")
      .end((err, res) => {
        expect(res).to.have.status(STATUS.OK);
        done();
      });
  });
});

describe("Create a user", () => {
  it("should be able to create a new user", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(STATUS.CREATED);
        done();
      });
  });
});

describe("Get all users", () => {
  it("should be able to return all the users", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(STATUS.OK);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.equal(1);
        done();
      });
  });
});

describe("Insert duplicated user", () => {
  it("should not be able to create a duplicated user", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("Get a user by username", () => {
  it("should be able to return a user by username", (done) => {
    chai
      .request(server)
      .get(`/users/username/${user.username}`)
      .end((err, res) => {
        expect(res).to.have.status(STATUS.OK);
        expect(res.body.username).to.be.equal(user.username);
        expect(res.body.id).to.be.not.undefined;
        user.id = res.body.id;
        done();
      });
  });
});

describe("Update a user", () => {
  it("should be able to update a user", (done) => {
    chai
      .request(server)
      .put(`/users/username/${user.username}`)
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(STATUS.OK);
        expect(res.body).to.be.an("object");
        expect(res.body.username).to.be.equal(newUser.username);
        done();
      });
  });
});

describe("Get a user by id", () => {
  it("should be able to return a user by id", (done) => {
    chai
      .request(server)
      .get(`/users/id/${user.id}`)
      .end((err, res) => {
        expect(res).to.have.status(STATUS.OK);
        expect(res.body).to.be.an("object");
        expect(res.body.username).to.be.equal(newUser.username);
        done();
      });
  });
});

describe("Delete a user", () => {
  it("should be able to delete a user", (done) => {
    chai
      .request(server)
      .delete(`/users/id/${user.id}`)
      .end((err, res) => {
        expect(res).to.have.status(STATUS.OK);
        done();
      });
  });
});
