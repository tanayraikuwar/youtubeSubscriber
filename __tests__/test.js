let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index"); //here we require server


//Assertion style
chai.should();
chai.use(chaiHttp);

describe("tasks API" , () =>{
    //test the "/subscribe" route
    describe("GET /subscribers" , ()=>{
        it("It should get all the subscribers" , (done)=>{
            chai.request(server)
                .get("/subscribers")
                .end((err,response)=>{
                    response.should.have.status(200); 
                    response.body.should.be.a("array");
                    response.body.length.should.be.eq(3);
                done();
                });
        });
        
        it("It should not get all the subscribers" , (done)=>{
            chai.request(server)
                .get("/subscriber")
                .end((err,response)=>{
                    response.should.have.status(404);
                done();
                });
        });
    });
    
    //test the "/subscribers/names" route
    //read the subscriber with only two fields

    describe("GET /subscribers/names" , ()=>{
        it("It should get all the subscribers with two fields" , (done)=>{
            chai.request(server)
                .get("/subscribers/names")
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body.length.should.be.eq(3);
                done();
                });
        });
    })


    // test the "/subscribers/:id" route
    // can read subscriber by their id's

    describe("GET /subscribers/:id" , ()=>{
        it("It should get all the subscribers by id's" , (done)=>{
            const taskId = "639f338cb9176f3c22707944" //will be added
            chai.request(server)
                .get("/subscribers/"+ taskId)
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a("object");       
                    response.body.should.have.property("_id");
                    response.body.should.have.property("name");
                    response.body.should.have.property("subscribedChannel");
                done();
                });
        });

        it("It should not get all the subscribers by id's" , (done)=>{
            const taskId = "asdfasdfasd" //will be added
            chai.request(server)
                .get("/subscribers/"+ taskId)
                .end((err,response)=>{
                    response.should.have.status(400);
                done();
                });
        });
    })
})