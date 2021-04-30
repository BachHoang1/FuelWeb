/*const assert = require('assert');
const {expect} = require('chai');
const { EMULTIHOP } = require('constants');
const { response } = require('express');
//onst {ClientSchema} = require('../models/client');
//const {dateCreated} = require('../models/client');
const {index} = require('../routes/index');
const {chaiHTTp} = require('chai-http');
let chai = require('chai');
chai.should();
chai.use(chaiHTTp);

describe("something",()=>{
    it("register", (done) => {
        const newClient = new newClient[
            {
                newAcc : true,
                username : "mike",
                dateCreated:"Wed Apr 28 2021 21:31:48 GMT-0500 (Central Daylight Time)"
            }
            ];
       chai.request(index)  
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
const { expect } = require('chai');
const request = require('supertest');
const app = require('../routes/clients');

describe('Test path', () =>
{
    test('It should', done =>{
        request(app)
        .get('/register')
        .then(response  =>{
            expect(response.render).toBe('register', message);
            done();
        })
    })
})*/