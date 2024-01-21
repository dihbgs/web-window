import { OK, CREATED } from "../src/interfaces/common/http";
import chaiHttp from "chai-http";
import { expect } from "chai";
import chai from "chai";

const server = "http://localhost:8000";

chai.use(chaiHttp);

describe("Get all users", () => {
  it("should be able to return all the users", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(OK);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("Create a user", () => {
  it("should be able to create a new user", (done) => {
    chai
      .request(server)
      .post("/users")
      .send({
        email: "new@user.com",
        username: "testUser",
        password: "665544",
      })
      .end((err, res) => {
        expect(res).to.have.status(CREATED);
        done();
      });
  });
});

describe("Insert duplicated user", () => {
  it("should not be able to create a duplicated user", (done) => {
    chai
      .request(server)
      .post("/users")
      .send({
        email: "new@user.com",
        username: "testUser",
        password: "654wd",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
