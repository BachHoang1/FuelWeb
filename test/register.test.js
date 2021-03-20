var request = require('supertest'), app = require('../server')

describe("register", function (){
    it("wellcomes the user", function (done){
        request(app).get("/").expect(3000)
    })
})