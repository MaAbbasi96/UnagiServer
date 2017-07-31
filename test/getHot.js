var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3000");

var testLocation = {
    latitude: 35.7293757,
    longitude: 51.4224622
};

describe("Get Hot Post Test", function () {
    it("Test1", function (done) {
        server.
        get("/post/hot").
        set("unique_id", "11111111111111111111111111111152").
        set("location", JSON.stringify(testLocation)).
        expect(200).
        end(function (err, res) {
            res.status.should.equal(200);
            done();
        });
    });
});