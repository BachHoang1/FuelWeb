/*const assert = require('assert');
const {expect} = require('chai');
const { EMULTIHOP } = require('constants');
const { response } = require('express');
//onst {ClientSchema} = require('../models/client');
const {dateCreated} = require('../models/client');
const {clients} = require('../routes/clients');
const {chaiHTTp} = require('chai-http');
let chai = require('chai');
chai.should();
chai.use(chaiHTTp);*/
/*
const newClient = [
    {
        newAcc : true,
        username : "mike",
        dateCreated:"Wed Apr 28 2021 21:31:48 GMT-0500 (Central Daylight Time)"
    }
    ]
  */  
 /*
describe('client.js',() =>{

    it('dateCreated', () =>{
            var result = dateCreated("Wed Apr 28 2021 21:31:48 GMT-0500 (Central Daylight Time)")
            expect(result).to.be.eq("Wed Apr 28 2021 21:31:48 GMT-0500 (Central Daylight Time)");
        })
    });
/*
describe("something",()=>{
    it("register", (done) => {
        const newClient = [
            {
                newAcc : true,
                username : "mike",
                dateCreated:"Wed Apr 28 2021 21:31:48 GMT-0500 (Central Daylight Time)"
            }
            ];
       chai.request(clients)  
       .post("/test/clients.spec.js")
       .send(newClient)
       .end((err, response)=>
       {
           response.body.should.be.a('object');
           response.body.should.be.property('newAcc');
           response.body.should.be.property('username');
           response.body.should.be.property('dateCreated');
           done();
       });
    });
});*/
/*
router.post("/register", (req, res) => {
    let newClient = new Client({ 
        newAcc: true,
        username: req.body.registerusername,
        dateCreated: Date()
    });
  */  