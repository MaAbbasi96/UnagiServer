var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3000");

var testLocation = { latitude: 35.7293757, longitude: 51.4224622 };

describe("Like Test", function(){
    it("Test1", function(done){
        server.
        get("/post").
        set("unique_id", "11111111111111111111111111111152").
        set("location", JSON.stringify(testLocation)).
        expect(200).
        end(function(err, res){
            res.status.should.equal(200);
            server.
            put("/post/" + res.body.posts[0]._id + "/like").
            set("unique_id", "11111111111111111111111111111152").
            set("location", JSON.stringify(testLocation)).
            expect(200).
            end(function(err2, res2){
                res2.status.should.equal(200);
                server.
                delete("/post/" + res.body.posts[0]._id + "/like").
                set("unique_id", "11111111111111111111111111111152").
                set("location", JSON.stringify(testLocation)).
                expect(200).
                end(function(err3, res3){
                    res3.status.should.equal(200);
                    done();
                });
            });
        });
    });
    it("Test1", function(done){
        server.
        get("/post").
        set("unique_id", "11111111111111111111111111111152").
        set("location", JSON.stringify(testLocation)).
        expect(200).
        end(function(err, res){
            res.status.should.equal(200);
            server.
            put("/post/" + res.body.posts[0]._id + "/like").
            set("unique_id", "11111111111111111111111111111152").
            set("location", JSON.stringify(testLocation)).
            expect(200).
            end(function(err2, res2){
                res2.status.should.equal(200);
                done();
            });
        });
    });
});