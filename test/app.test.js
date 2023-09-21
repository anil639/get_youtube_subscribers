const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");
const mongoose = require("mongoose");
const subscribersData = require("../src/models/subscribers");
const { expect } = chai;

chai.use(chaiHttp);

describe("app", () => {
  let sampleSubscriber;

  before(async () => {
    // Connect to a test db
    await mongoose.connect("mongodb://localhost/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a sample subscriber in the test db
    sampleSubscriber = await subscribersData.create({
      name: "Sample Subscriber",
      subscribedChannel: "Sample Channel",
    });
  });

  after(async () => {
    //removing the sample subscriber and close the connection from the test db
    await subscribersData.findByIdAndRemove(sampleSubscriber._id);
    await mongoose.connection.close();
  });

  // test for the root route that sends the home.html file
  describe("/", () => {
    it("should send the home.html file", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200); //the response has a status code of 200
          expect(res).to.have.header(
            "content-type",
            "text/html; charset=UTF-8"
          ); //response has the correct content type
          done();
        });
    });
  });

  //test for the /subscribers route that gives all subscribers data
  describe("/subscribers", () => {
    it("give all the subscribers data", (done) => {
      chai
        .request(app)
        .get("/subscribers")
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200); //the response has a status code of 200
          done();
        });
    });
  });
  // test for the /subscribers/names route that return subscriber names and subscribed channels
  describe("/subscribers/names", () => {
    it("return subscribers names and subscribed channels", (done) => {
      chai
        .request(app)
        .get("/subscribers/names")
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200); //the response has a status code of 200
          done();
        });
    });
  });
  //test for the /subscribers/:id route that returns a single subscriber if ID matches the request.
  describe("subscribers/:id", () => {
    it("return a single subscriber by ID", (done) => {
      chai
        .request(app)
        .get(`/subscribers/${sampleSubscriber._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200); //the response has a status code of 200
          done();
        });
    });
    //test for an invalid ID to show error
    it("return a 400 status code for an invalid ID", (done) => {
      chai
        .request(app)
        .get("/subscribers/invalidId")
        .end((err, res) => {
          expect(res).to.have.status(400); //the response has a status code of 400
          done();
        });
    });
  });
});
