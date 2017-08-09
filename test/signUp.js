var supertest = require("supertest");
var should = require("should");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/college", { useMongoClient: true });
mongoose.Promise = require("bluebird");

var UserSchema = require("../models/User");
mongoose.model("User", UserSchema);
var User = mongoose.model("User");

var server = supertest.agent("http://localhost:3000");

var testJson = {
    username: "mahdi",
    password: "mahdi"
};

describe("Registration Test", function() {
    it("Test1: valid register", function(done) {
        server
            .post("/auth/register")
            .type("json")
            .send(testJson)
            .expect(201)
            .end(function(err, res) {
                User.remove({ username: testJson.username }, function(error) {
                    res.status.should.equal(201);
                    done();
                });
            });
    });
    it("Test2: invalid register");
});
